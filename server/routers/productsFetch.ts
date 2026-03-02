import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { TRPCError } from '@trpc/server';
import * as cheerio from 'cheerio';

interface ProductInfo {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

async function fetchProductInfo(url: string): Promise<ProductInfo> {
  try {
    // URL'nin geçerli olup olmadığını kontrol et
    new URL(url);

    // GitHub repository URL'si ise
    if (url.includes('github.com')) {
      return await fetchGitHubRepoInfo(url);
    }

    // Timeout ile fetch yap (retry ile)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 saniye timeout

    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    ];

    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    const response = await fetch(url, {
      headers: {
        'User-Agent': randomUserAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // 403 hatası için alternatif yöntem dene
      if (response.status === 403) {
        throw new Error(`HTTP 403 - Erişim reddedildi. Lütfen daha sonra tekrar deneyin veya URL'yi manuel olarak girin.`);
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Etsy sayfasından bilgi çek
    if (url.includes('etsy.com')) {
      return parseEtsyProduct($);
    }

    // Amazon sayfasından bilgi çek
    if (url.includes('amazon.com') || url.includes('amazon.co')) {
      return parseAmazonProduct($);
    }

    // Genel e-ticaret sayfaları için fallback
    return parseGenericProduct($, url);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new TRPCError({
          code: 'TIMEOUT',
          message: 'İstek zaman aşımına uğradı (10 saniye). Lütfen daha sonra tekrar deneyin.',
        });
      }
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Ürün bilgisi çekilemedı: ${error.message}`,
      });
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Bilinmeyen bir hata oluştu',
    });
  }
}

async function fetchGitHubRepoInfo(url: string): Promise<ProductInfo> {
  try {
    // GitHub URL'sinden owner ve repo adını çek
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new Error('Geçerli bir GitHub repository URL\'si girin');
    }

    const [, owner, repo] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    // GitHub API'den bilgi çek
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Mozilla/5.0',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`GitHub API hatası: ${response.status}`);
    }

    const data: any = await response.json();

    return {
      title: data.name || 'Repository',
      description: data.description || 'Açıklama yok',
      price: `⭐ ${data.stargazers_count} Stars | 🍴 ${data.forks_count} Forks`,
      imageUrl: data.owner?.avatar_url || '',
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `GitHub bilgisi çekilemedı: ${error.message}`,
      });
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'GitHub API hatası',
    });
  }
}

function parseEtsyProduct($: cheerio.CheerioAPI): ProductInfo {
  // Etsy sayfasından başlık çek
  const title =
    $('h1[data-testid="listing-title"]').text().trim() ||
    $('h1').first().text().trim() ||
    $('[data-testid="listing-title"]').text().trim() ||
    'Başlık bulunamadı';

  // Fiyat çek
  const priceText =
    $('[data-testid="listing-price"]').text().trim() ||
    $('.listing-price').text().trim() ||
    $('[data-testid="product-price"]').text().trim() ||
    'Fiyat bulunamadı';

  // Açıklama çek
  const description =
    $('[data-testid="listing-description"] p').text().trim() ||
    $('.listing-description').text().trim() ||
    $('meta[name="description"]').attr('content') ||
    'Açıklama bulunamadı';

  // Görsel URL'si çek
  const imageUrl =
    $('[data-testid="listing-image"] img').attr('src') ||
    $('[data-testid="listing-image"] img').attr('data-src') ||
    $('img[alt*="product"]').first().attr('src') ||
    $('img').first().attr('src') ||
    '';

  return {
    title,
    description: description.substring(0, 500), // İlk 500 karakter
    price: priceText,
    imageUrl: imageUrl || '',
  };
}

function parseAmazonProduct($: cheerio.CheerioAPI): ProductInfo {
  // Amazon sayfasından başlık çek
  const title =
    $('#productTitle').text().trim() ||
    $('h1').first().text().trim() ||
    'Başlık bulunamadı';

  // Fiyat çek
  const priceText =
    $('.a-price-whole').first().text().trim() ||
    $('[data-a-color="price"]').first().text().trim() ||
    'Fiyat bulunamadı';

  // Açıklama çek
  const description =
    $('#feature-bullets li').map((_, el) => $(el).text().trim()).get().join(' ') ||
    'Açıklama bulunamadı';

  // Görsel URL'si çek
  const imageUrl =
    $('#landingImage').attr('src') ||
    $('img[alt*="product"]').first().attr('src') ||
    '';

  return {
    title,
    description: description.substring(0, 500),
    price: priceText,
    imageUrl: imageUrl || '',
  };
}

function parseGenericProduct($: cheerio.CheerioAPI, url: string): ProductInfo {
  // Genel meta tag'lardan bilgi çek
  const title =
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="title"]').attr('content') ||
    $('h1').first().text().trim() ||
    'Başlık bulunamadı';

  const description =
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    $('p').first().text().trim() ||
    'Açıklama bulunamadı';

  const imageUrl =
    $('meta[property="og:image"]').attr('content') ||
    $('img').first().attr('src') ||
    '';

  // Fiyat çek (çeşitli formatlar)
  let price = 'Fiyat bulunamadı';
  const pricePatterns = [
    /\$[\d,]+\.?\d*/g,
    /€[\d,]+\.?\d*/g,
    /£[\d,]+\.?\d*/g,
    /₺[\d,]+\.?\d*/g,
  ];

  const pageText = $.text();
  for (const pattern of pricePatterns) {
    const match = pageText.match(pattern);
    if (match) {
      price = match[0];
      break;
    }
  }

  return {
    title,
    description: description.substring(0, 500),
    price,
    imageUrl: imageUrl || '',
  };
}

export const productsFetchRouter = router({
  fetchProductInfo: publicProcedure
    .input(z.object({ url: z.string().url('Geçerli bir URL girin') }))
    .mutation(async ({ input }) => {
      const productInfo = await fetchProductInfo(input.url);
      return {
        success: true,
        data: productInfo,
      };
    }),
});
