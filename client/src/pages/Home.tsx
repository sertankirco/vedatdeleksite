import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Star,
  BookOpen,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    // SEO Meta Tags
    document.title =
      "Vedat Delek - Astroloji Platformu | Yıldızlar Altında Kaderinizi Keşfedin";

    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Vedat Delek ile astroloji danışmanlığı alın. Doğum haritası analizi, burç yorumları ve ruhani rehberlik hizmetleri."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Vedat Delek ile astroloji danışmanlığı alın. Doğum haritası analizi, burç yorumları ve ruhani rehberlik hizmetleri.";
      document.head.appendChild(meta);
    }

    // Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        "content",
        "astroloji, burç yorumları, doğum haritası, ruhani rehberlik, Vedat Delek, astroloji danışmanlığı, kişisel astroloji, yıldızlar, kozmik enerji"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content =
        "astroloji, burç yorumları, doğum haritası, ruhani rehberlik, Vedat Delek, astroloji danışmanlığı, kişisel astroloji, yıldızlar, kozmik enerji";
      document.head.appendChild(meta);
    }

    // Open Graph Tags (sosyal medya paylaşımı için)
    const metaOGTitle = document.querySelector('meta[property="og:title"]');
    if (metaOGTitle) {
      metaOGTitle.setAttribute("content", "Vedat Delek - Astroloji Platformu");
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      meta.content = "Vedat Delek - Astroloji Platformu";
      document.head.appendChild(meta);
    }

    const metaOGDesc = document.querySelector(
      'meta[property="og:description"]'
    );
    if (metaOGDesc) {
      metaOGDesc.setAttribute(
        "content",
        "Yıldızlar altında kaderinizi keşfedin. Vedat Delek ile astroloji danışmanlığı alın."
      );
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      meta.content =
        "Yıldızlar altında kaderinizi keşfedin. Vedat Delek ile astroloji danışmanlığı alın.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
            {/* Left Side - Text */}
            <div>
              <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-blue-200 dark:border-slate-700">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {t("home.title")}
                </span>
              </div>

              <h1 className="text-hero mb-6 text-slate-900 dark:text-white">
                {t("home.hero.title").split(" ").slice(0, -3).join(" ")}{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t("home.hero.title").split(" ").slice(-3).join(" ")}
                </span>
              </h1>

              <p className="text-subtitle mb-12 max-w-2xl">
                {t("home.hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link href="/shop">
                  <Button className="btn-astro-primary">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {t("nav.shop")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden md:flex justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663294098536/WihJiDqduMNoEiyl.jpg"
                  alt="Vedat Delek"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section - Kilidi Book */}
      <section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663294098536/CNFTOBcTzjkjxTOC.png"
                  alt="Kilidi Book"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
            {/* Right Side - Text */}
            <div className="text-slate-900">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ color: "#1E90FF" }}
              >
                Αγαπημενη Παναγια, σε αναγνωριζω και ξερω οτι κι εσυ με
                αναγνωριζεις.
              </h2>
              <p className="text-lg mb-8" style={{ color: "#333333" }}>
                {t("home.kilidi.description")}
              </p>
              <a
                href="https://www.irakleitosbooks.gr/shop/products/kleidi?locale=el_GR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  className="px-8 py-3 font-semibold rounded-lg"
                  style={{ backgroundColor: "#1E90FF", color: "#FFFFFF" }}
                >
                  {t("nav.books")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                {t("home.features.feature1.title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {t("home.features.feature1.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                {t("home.features.feature2.title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {t("home.features.feature2.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                {t("home.features.feature3.title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {t("home.features.feature3.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Kişisel Astroloji Hizmetleri */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "#1E90FF" }}
          >
            {t("home.cta.title")}
          </h2>
          <p className="text-lg mb-8" style={{ color: "#333333" }}>
            {t("home.cta.subtitle")}
          </p>
          <Link href="/shop" className="inline-block">
            <Button
              className="px-8 py-3 font-semibold rounded-lg"
              style={{ backgroundColor: "#1E90FF", color: "#FFFFFF" }}
            >
              {t("home.cta.button")}
              <ShoppingBag className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
