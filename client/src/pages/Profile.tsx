import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { User, Mail, Calendar, LogOut, Lock } from "lucide-react";
export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full text-center">
          <Lock className="w-16 h-16 mx-auto text-blue-600 mb-4" />
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
            {t("nav.login")}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("profile.title")}
          </h1>
          <p className="text-subtitle">{t("profile.subtitle")}</p>
        </div>

        {/* Vedat Delek Info Card */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 border-blue-200 dark:border-slate-700 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {t("profile.about")}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Ünlü astrolog ve yaşam danışmanı Vedat Delek, 20 yılı aşkın
                deneyimi ile binlerce kişinin yaşamını değiştirmiştir.
                Astroloji, numeroloji ve karmik rehberlik konularında uzman olan
                Vedat Delek, modern teknoloji ile geleneksel bilgeliği
                birleştirerek platformu oluşturmuştur.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                AI destekli danışmanlığı ile artık herkes kişisel astroloji
                hizmetlerine erişebilir.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
                <img
                  src="/vedatdelek.jpg"
                  alt="Vedat Delek"
                  className="relative w-full max-w-sm rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Card */}
        <Card className="p-8 bg-white dark:bg-slate-900 border-blue-200 dark:border-slate-700 mb-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {user.name || "Kullanıcı"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {user.role === "admin" ? "👑 Yönetici" : "Kullanıcı"}
              </p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  E-posta
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {user.email || "Belirtilmemiş"}
                </p>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Üye Olunduğu Tarih
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Login Method */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Lock className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Giriş Yöntemi
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {user.loginMethod || "Manus OAuth"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Preferences */}
          <Card className="p-6 bg-white dark:bg-slate-900 border-blue-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
              ⚙️ Tercihler
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Dil, tema ve bildirim tercihlerinizi yönetin.
            </p>
            <Button className="btn-astro-secondary w-full" disabled>
              Yakında
            </Button>
          </Card>

          {/* Birth Chart */}
          <Card className="p-6 bg-white dark:bg-slate-900 border-blue-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
              🌙 Doğum Haritası
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Kişisel doğum haritanızı oluşturun ve analiz alın.
            </p>
            <Button className="btn-astro-secondary w-full" disabled>
              Yakında
            </Button>
          </Card>
        </div>

        {/* Logout Button */}
        <div className="flex gap-4">
          <Link href="/">
            <Button className="btn-astro-secondary flex-1">
              Ana Sayfaya Dön
            </Button>
          </Link>
          <Button onClick={() => logout()} className="btn-astro-primary flex-1">
            <LogOut className="w-4 h-4 mr-2" />
            Çıkış Yap
          </Button>
        </div>
      </div>
    </div>
  );
}
