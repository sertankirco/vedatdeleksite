import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

import { Menu, X, Globe, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  const navLinks = [
    { path: "/", label: t("nav.home") },
    {
      path: "/biography",
      label:
        language === "tr"
          ? "Biyografi"
          : language === "en"
            ? "Biography"
            : "Βιογραφία",
    },
    { path: "/blog", label: t("nav.blog") },
    {
      path: "/books",
      label:
        language === "tr" ? "Kitaplar" : language === "en" ? "Books" : "Βιβλία",
    },
    {
      path: "/contact",
      label:
        language === "tr"
          ? "İletişim"
          : language === "en"
            ? "Contact"
            : "Επικοινωνία",
    },
  ];

  const adminLinks: any[] = [];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-white border-b border-slate-200 dark:border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="text-2xl">✨</div>
            <span
              className="font-bold text-lg text-blue-600 hidden sm:inline"
              style={{ color: "#1E90FF" }}
            >
              Vedat Delek
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.path} href={link.path} className="inline-block">
                <button
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-white text-blue-600 border-b-2 border-blue-600"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                  style={isActive(link.path) ? { color: "#1E90FF" } : {}}
                >
                  {link.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector */}
            <div className="flex gap-1 border border-slate-300 dark:border-slate-600 rounded-lg p-1">
              {(["tr", "en", "el"] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                    language === lang
                      ? "bg-white text-blue-600 border-2"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  style={
                    language === lang
                      ? { color: "#1E90FF", borderColor: "#1E90FF" }
                      : {}
                  }
                  title={
                    lang === "tr"
                      ? "Türkçe"
                      : lang === "en"
                        ? "English"
                        : "Ελληνικά"
                  }
                >
                  {lang === "tr" ? "🇹🇷" : lang === "en" ? "🇬🇧" : "🇬🇷"}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-sm text-slate-600 dark:text-slate-400">
                  {user.name || user.email}
                </span>
                <Link href="/profile" className="inline-block">
                  <button
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Profil"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-purple-600" />
                  </button>
                </Link>
                <button
                  onClick={() => logout()}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title={t("nav.logout")}
                >
                  <LogOut className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
            ) : (
              <Button
                className="btn-astro-primary hidden sm:flex"
                onClick={() => (window.location.href = "/login")}
              >
                {t("nav.login")}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map(link => (
              <Link key={link.path} href={link.path} className="block">
                <button
                  onClick={() => setIsOpen(false)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}

            {!user && (
              <Button
                className="btn-astro-primary w-full"
                onClick={() => (window.location.href = "/login")}
              >
                {t("nav.login")}
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
