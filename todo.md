# Vedat Delek Astroloji Platformu - TODO

## Veritabanı & Backend
- [x] Veritabanı şeması tasarımı (zodiacSigns, horoscopes, chatMessages, products, blogPosts, videos)
- [x] tRPC prosedürleri: horoscope.getDaily, chat.sendMessage, products.list
- [x] Gemini AI entegrasyonu (horoscope generation, chat responses)
- [ ] Kullanıcı profili ve tercihleri yönetimi
- [x] Admin yönetim prosedürleri (content CRUD)

## Frontend - Temel Sayfa & Bileşenler
- [x] Responsive navbar (üç dil desteği, dil değiştirme)
- [x] Ana sayfa (hero section, özellikler, CTA)
- [x] Burç yorumları sayfası (12 burç selector, AI yanıtları)
- [x] Sohbet sayfası (AI Vedat ile konuşma, mesaj geçmişi)
- [x] Ürün/Hizmet mağazası (ürün listesi, detay, satın alma linki)
- [x] Blog sayfası (makale listesi, detay görünümü)
- [x] Video galerisi
- [x] Admin dashboard
- [x] Kullanıcı profili sayfası
- [x] Footer

## Frontend - Yönetici Paneli
- [x] Admin dashboard (istatistikler, graflar)
- [x] İçerik yönetimi (blog yazıları CRUD)
- [x] Ürün yönetimi (ürün listesi, ekleme, düzenleme, silme)
- [x] Video yönetimi
- [ ] AI ayarları (prompt tuning, temperature, model seçimi)
- [ ] Analitik ve raporlama

## Tasarım & UX
- [x] Modern, estetik renk paleti (astroloji teması)
- [x] Tailwind CSS tema konfigürasyonu
- [x] Responsive tasarım (mobil, tablet, desktop)
- [x] Loading states, error handling, empty states
- [x] Animasyonlar ve geçişler (Framer Motion)
- [x] Footer ile tam sayfa layoutı

## Çok Dil Desteği
- [x] Türkçe çeviriler (tüm sayfalar)
- [x] Yunanca çeviriler (tüm sayfalar)
- [x] İngilizce çeviriler (tüm sayfalar)
- [x] Dil değiştirme mekanizması ve localStorage kalıcılığı
- [x] Dinamik içerik çevirisi (AI yanıtları)

## Güvenlik & Kimlik Doğrulama
- [ ] Manus OAuth entegrasyonu
- [ ] Admin rol yönetimi
- [ ] Oturum yönetimi
- [ ] Protected routes (admin paneli)
- [ ] CSRF koruması

## Test & Optimizasyon
- [ ] Vitest unit testleri (tRPC prosedürleri)
- [ ] E2E test senaryoları (kritik akışlar)
- [ ] Performans optimizasyonu (lazy loading, code splitting)
- [ ] SEO optimizasyonu (meta tags, sitemap)

## Yayınlama
- [ ] Checkpoint oluşturma
- [ ] Kalıcı yayınlama (Manus hosting)
- [ ] Custom domain yapılandırması
- [ ] Monitoring ve logging

## Entegrasyonlar
- [x] Etsy entegrasyonu (ürün linklemesi ve satın alma)
- [ ] Email bildirimleri
- [ ] Sosyal medya linklemesi

## Etsy/E-ticaret URL'sinden Otomatik Ürün Bilgisi Çekme
- [x] Backend endpoint'i oluşturma (/api/products/fetch-info)
- [x] Web scraping kütüphanesi kurma (cheerio)
- [x] Frontend'de ürün linki input'u ve 'Bilgileri Çek' butonu
- [x] Otomatik form doldurma
- [x] Error handling ve timeout
- [x] Toast notification entegrasyonu

## GitHub Repository URL'sinden Ürün Bilgisi Çekme
- [x] GitHub API entegrasyonu (owner/repo parsing)
- [x] Repository bilgilerini çekme (ad, açıklama, yıldız, görsel)
- [x] Frontend'de GitHub URL desteği
- [ ] Test: sertankirco/-R-N-EKME-L-NK- repository'si ile test etme

## Tarayıcı Dili Algılama
- [x] Kullanıcının tarayıcı dilini otomatik algılama (navigator.language)
- [x] Desteklenen dillere göre site dilini ayarlama (tr, en, el)
- [x] localStorage'da kaydedilmiş dil tercihine öncelik verme

## AI Vedat Sohbet Kaldırma
- [x] Chat.tsx sayfasını silme
- [x] Navbar'dan sohbet linkini çıkarma
- [x] App.tsx'den sohbet rotalarını çıkarma
- [x] Çevirilerden sohbet metinlerini çıkarma
- [ ] tRPC chat router'ını kaldırma (isteğe bağlı)

## Ana Sayfa Çevirilerinin Tamamlanması
- [x] Hardcoded Türkçe metinleri çeviriler ile değiştirme
- [x] Dil değiştiğinde ana sayfanın otomatik güncellenesi sağlama

## Urun Otomatik Ekleme Sistemi
- [x] AdminProducts.tsx'de form submit islemini kontrol etme
- [x] Backend'de urun ekleme prosedurunu test etme
- [x] Etsy/GitHub linkinden bilgi cekme sonrasi otomatik ekleme
- [x] Error handling ve success mesajlari
- [x] Urun Gorseli URL alanini ekleme

## HTTP 403 Hatasi Cozumu
- [x] productsFetch.ts dosyasinda User-Agent header ekleme
- [x] Coklu User-Agent ve ek HTTP headers ekleme
- [x] Etsy parsing selectorlerini iyilestirme
- [x] Hata mesajlarini iyilestirme

## Otomatik URL Çekme Özelliğini Kaldırma
- [x] AdminProducts.tsx'den "Bilgileri Çek" butonu ve URL input'u kaldırma
- [ ] productsFetch.ts router'ını kaldırma
- [x] Manuel ürün ekleme formunu basitleştirme
- [x] Ürün ekleme formunu test etme

## Ürün Fotoğrafı Ölçü Ayarı
- [x] Shop.tsx'de ürün kartı ölçülerini kontrol etme
- [x] Ürün görselleri için aspect ratio ayarlama (h-64, object-contain)
- [x] Görsellerin tam görünmesini sağlama (crop/overflow düzeltme)
- [x] Responsive tasarımda test etme

## İletişim Sayfası ve Sosyal Medya Entegrasyonu
- [x] Contact.tsx sayfası oluşturma
- [x] Sosyal medya linklerini LanguageContext'e ekleme
- [x] App.tsx'de Contact rotası ekleme
- [x] Navbar'da İletişim linki ekleme
- [x] Shop sayfasındaki "Kişisel Danışmanlık" butonunu Contact'e bağlama
- [x] Responsive tasarım ve test etme

## Ana Sayfa Yazısı Değişikligi
- [x] Home.tsx'de açılış yazısını değiştirme
- [x] Test etme ve checkpoint kaydetme

## Burç Yorumları Sekmesi Kaldırma - Biyografi Ekleme
- [x] Vedat Delek'in biyografisini araştırma
- [x] Biography.tsx'e biyografi içeriğini ekleme
- [x] Ana sayfadaki Burç Yorumları butonunu kaldırma
- [x] Navbar'da Burç Yorumları linkini Biyografi olarak değiştirme
- [x] Test etme ve checkpoint kaydetme

## Tüm Burç Yorumları Bölümlerini Kaldırma
- [x] Home.tsx'deki burç yorumları bölümlerini kaldırma
- [x] Horoscope.tsx sayfasını kaldırma
- [x] App.tsx'den horoscope rotasını kaldırma
- [x] LanguageContext.tsx'den horoscope çevirilerini kaldırma
- [x] Test etme ve checkpoint kaydetme

## Footer - AI Vedat Linki Kaldırma
- [x] Footer bileşeninde AI Vedat linkini kaldırma (Burç Yorumları ve AI Vedat linklerini kaldırıp Biyografi linki eklendi)
- [x] LanguageContext.tsx'de footer AI Vedat çevirilerine referans yok (footer.rights ve footer.tagline sadece telif hakkı ve tagline)
- [x] Test etme ve checkpoint kaydetme

## Biyografi Yazısı Güncelleme
- [x] Biography.tsx'deki biyografi yazısını yeni metinle değiştirme
- [x] LanguageContext.tsx'de biyografi çevirilerini güncelleme (İngilizce ve Yunanca)
- [x] Test etme ve checkpoint kaydetme

## Blog Sayfası Tasarım Güncellemesi
- [x] Blog.tsx dosyasını inceleyerek mevcut yapıyı anlamak
- [x] Blog sayfasını kart tabanlı grid düzeniyle yeniden tasarlamak (3 sütun responsive)
- [x] Kategori etiketleri, tarih, okuma süresi ve "Devamını Oku" linki eklemek
- [x] Arama ve filtreleme özelliği eklemek (kategori filtreleri)
- [x] Tailwind CSS ve @tailwindcss/typography kullanarak profesyonel görünüm oluşturmak
- [x] Test etme ve checkpoint kaydetme

## Blog Detay Sayfası Hatası Düzeltme
- [x] Blog.tsx'de routing hatasını kontrol etme
- [x] BlogDetail.tsx sayfası oluşturma
- [x] App.tsx'de /blog/:id rotasını ekleme
- [x] Test etme ve checkpoint kaydetme

## Shop Sayfası - Fiyat Bilgisi Kaldırma
- [x] Shop.tsx'de ürün kartlarından fiyat bilgisini kaldırma
- [x] Test etme ve checkpoint kaydetme

## Ana Sayfa - KLİDİ KİTAP Bölümü Ekleme
- [x] KLİDİ KİTAP görseli S3'e yüklemek
- [x] Home.tsx'e KLİDİ KİTAP bölümü ekleme (görsel ve tıklanabilir alan)
- [x] Books.tsx sayfası oluşturma
- [x] App.tsx'de /books rotası ekleme
- [x] Test etme ve checkpoint kaydetme

## KLİDİ KİTAP Fotoğrafı Değişikligi
- [x] Yeni KLİDİ KİTAP görseli S3'e yüklemek
- [x] Home.tsx'de KLİDİ KİTAP görsel URL'sini güncellemek
- [x] Test etme ve checkpoint kaydetme

## KLİDİ KİTAP Çerçeve Kaldırma
- [x] Home.tsx'de KLİDİ KİTAP bölümünün çerçevesini kaldırıp sadece fotoğrafı göstermek
- [x] Test etme ve checkpoint kaydetme

## KLİDİ KİTAP Bölümü Ana Sayfaya Taşıma
- [x] Books.tsx sayfasını kaldırma ve App.tsx'den /books rotasını kaldırma
- [x] Home.tsx'de KLİDİ KİTAP bölümünü ana sayfaya taşıma (kitaplar listesini ekleme)
- [x] KLİDİ KİTAP linkini scroll efektiyle ayarlama
- [x] Test etme ve checkpoint kaydetme

## Kitaplar Sekmesi Oluşturma
- [x] Home.tsx'den KLİDİ KİTAP bölümünü kaldırma
- [x] Books.tsx sayfasını yeniden oluşturma (ayrı sayfa - kitaplar grid)
- [x] App.tsx'de /books rotasını ekleme
- [x] Navbar'da Kitaplar sekmesini ekleme
- [x] Test etme ve checkpoint kaydetme

## Books.tsx Güncelleme - Sadece KLİDİ KİTAP Görseli
- [x] Books.tsx'de kitaplar listesini kaldırma
- [x] Sadece KLİDİ KİTAP görseli ve açıklama metni gösterme
- [x] Görselin altında açıklama metni ekleme (Türkçe, İngilizce, Yunanca)
- [x] Test etme ve checkpoint kaydetme

## Kitap Görseli Ekleme
- [x] Kitap görseli (kilidi.png) S3'e yükleme
- [x] Books.tsx'de görseli placeholder yerine kullanma
- [x] Tüm dillerde test etme

## Ana Sayfa Düzeltmeleri
- [x] Çeviri anahçarlarını düzeltme (feature1, feature2, feature3)
- [x] Kayıp fotoğrafı geri getirme
- [x] Test etme ve checkpoint kaydetme

## Ana Sayfa Fotoğraf Değiştirme
- [x] Vedat Delek'in fotoğrafını S3'e yükleme
- [x] Home.tsx'de placeholder kartı fotoğraf ile değiştirme
- [x] Test etme ve checkpoint kaydetme

## Mağaza ve Videolar Sekmelerini Kaldırma
- [x] Navbar'dan Mağaza ve Videolar sekmelerini kaldırma
- [x] App.tsx'den /shop ve /videos rotalarını kaldırma
- [x] Test etme ve checkpoint kaydetme

## Ana Sayfa Banner Bölümü Oluşturma
- [x] KLİDİ kitabı görseli S3'e yükleme
- [x] Home.tsx'e banner bölümü oluşturma (KLİDİ görseli + Yunanca mesaj)
- [x] Test etme ve checkpoint kaydetme

## KLİDİ Kitabı Satın Alma Linki Ekleme
- [x] Home.tsx banner butonunu Irakleitos Books linki ile güncellemek
- [x] Test etme ve checkpoint kaydetme

## KLİDİ Açıklama Güncellemesi
- [x] LanguageContext'te KLİDİ açıklamasını Yunanca, Türkçe ve İngilizce olarak ekleme
- [x] Home.tsx'de KLİDİ açıklamasını güncellemek
- [x] Test etme ve checkpoint kaydetme
## Renk Şeması Güncellemesi - Lacivert → Beyaz, Yazılar → Yunan Mavisi
- [x] Tailwind CSS renk şemasını Yunan bayrağı mavisi (#1E90FF) ile güncellemek
- [x] index.css'de CSS değişkenlerini güncellemek
- [x] Bileşenlerde lacivert renklerini beyaz yapıp yazıları mavi yapmak
- [x] Test etme ve checkpoint kaydetme

## Footer Renk Şeması Güncellemesi
- [x] Footer.tsx'de lacivert renklerini beyaz yapıp metin renklerini mavi yapmak
- [x] Test etme ve checkpoint kaydetme

## Copyright Bölümü Renk Şeması Güncellemesi
- [x] Footer'ın copyright bölümünü beyaz arka plan yapıp metin renklerini mavi yapmak
- [x] Test etme ve checkpoint kaydetme

## Kişisel Astroloji Hizmetleri Bölümü Taşıma ve Renk Değiştirme
- [ ] Home.tsx'de bölümü Footer'ın önüne taşıma
- [ ] Bölümün arka planını beyaz yapıp metin renklerini mavi yapma
- [ ] Test etme ve checkpoint kaydetme

## SEO Meta Etiketleri Ekleme
- [x] Home.tsx'de SEO meta etiketlerini (başlık, açıklama, anahtar kelimeler) eklemek
- [x] Test etme ve checkpoint kaydetme
