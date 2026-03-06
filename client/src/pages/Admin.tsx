import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  BarChart3,
  FileText,
  Video,
  ShoppingBag,
  Settings,
  Lock,
} from "lucide-react";
import AdminBlog from "./AdminBlog";
import AdminVideos from "./AdminVideos";
import AdminProducts from "./AdminProducts";

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "blog" | "videos" | "products" | "settings"
  >("dashboard");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full text-center">
          <Lock className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            {t("admin.login")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {t("admin.login.text")}
          </p>
          <Button
            className="btn-astro-primary w-full"
            onClick={() => (window.location.href = "/login")}
          >
            Giriş Yap
          </Button>
        </Card>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full text-center">
          <Lock className="w-16 h-16 mx-auto text-red-600 mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            {t("admin.forbidden")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {t("admin.forbidden.text")}
          </p>
          <Link href="/">
            <Button className="btn-astro-secondary w-full">
              {t("admin.home")}
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const tabs = [
    {
      id: "dashboard" as const,
      label: t("admin.dashboard"),
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "blog" as const,
      label: t("admin.blog"),
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "videos" as const,
      label: t("admin.videos"),
      icon: <Video className="w-4 h-4" />,
    },
    {
      id: "products" as const,
      label: t("admin.products"),
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      id: "settings" as const,
      label: t("admin.settings"),
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-hero mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t("admin.dashboard")}
          </h1>
          <p className="text-subtitle">
            Hoş geldiniz, {user.name || user.email}!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "btn-astro-primary"
                  : "btn-astro-secondary"
              }`}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t("admin.dashboard")}</h2>

              {/* Vedat Delek Info Banner */}
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 border-blue-200 dark:border-slate-700">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                      Vedat Delek Astroloji Platformu
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      Unlu astrolog Vedat Delek'in yapay zeka destekli astroloji
                      platformu. Gunluk burc yorumlari, kisisel analiz ve yasam
                      rehberligi hizmetleri sunuyoruz.
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Yonetim panelini kullanarak tum icerigi yonetebilirsiniz.
                    </p>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <img
                      src="/vedatdelek.jpg"
                      alt="Vedat Delek"
                      className="w-32 h-32 rounded-full object-cover shadow-lg"
                    />
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: t("admin.total_users"), value: "—", icon: "👥" },
                  { label: t("admin.blog_posts"), value: "—", icon: "📝" },
                  { label: t("admin.videos_count"), value: "—", icon: "🎥" },
                  { label: t("admin.products_count"), value: "—", icon: "🛍️" },
                ].map((stat, idx) => (
                  <Card
                    key={idx}
                    className="p-6 text-center bg-slate-50 dark:bg-slate-800"
                  >
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                  </Card>
                ))}
              </div>

              {/* Info Banner */}
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 border-blue-200 dark:border-blue-700">
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                  💡 {t("admin.welcome")}
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  {t("admin.info")}
                </p>
              </Card>
            </div>
          )}

          {activeTab === "blog" && <AdminBlog />}
          {activeTab === "videos" && <AdminVideos />}
          {activeTab === "products" && <AdminProducts />}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Ayarlar</h2>
              <Card className="p-6 bg-slate-50 dark:bg-slate-800">
                <h3 className="font-bold mb-2">AI Ayarları</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Gemini AI ayarları yakında eklenecektir.
                </p>
                <Button className="btn-astro-secondary" disabled>
                  Yakında
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
