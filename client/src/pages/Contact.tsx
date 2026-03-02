import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Instagram, Youtube, Mail, Facebook, ArrowLeft } from "lucide-react";

export default function Contact() {
  const { language, t } = useLanguage();

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/astrologvedatdelek",
      color: "hover:text-pink-600 dark:hover:text-pink-400",
      bgColor: "hover:bg-pink-50 dark:hover:bg-pink-900/20",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/c/AstrologVedatDelek",
      color: "hover:text-red-600 dark:hover:text-red-400",
      bgColor: "hover:bg-red-50 dark:hover:bg-red-900/20",
    },
    {
      name: "X (Twitter)",
      icon: Mail,
      url: "https://x.com/ast_vedatdelek",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/astrologvedatdelek/?locale=tr_TR",
      color: "hover:text-blue-700 dark:hover:text-blue-300",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("contact.back")}
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("contact.title")}
          </h1>
          <p className="text-subtitle mb-4">
            {t("contact.subtitle")}
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Email Card */}
          <Card className="card-astro p-8 text-center hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
              {t("contact.email")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {t("contact.email.desc")}
            </p>
            <Button className="btn-astro-primary w-full">
              {t("contact.email")}
            </Button>
          </Card>

          {/* Social Media Info Card */}
          <Card className="card-astro p-8 text-center hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Instagram className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
              {t("contact.follow")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {t("contact.follow.desc")}
            </p>
          </Card>
        </div>

        {/* Social Media Links */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {t("contact.follow")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-3 p-4 rounded-lg transition-all ${social.bgColor} group`}
                >
                  <Icon className={`w-8 h-8 text-white group-hover:scale-110 transition-transform ${social.color}`} />
                  <span className="text-sm font-medium text-center">{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
            {language === "tr" ? "Danışmanlık Hizmetleri" : language === "en" ? "Consultation Services" : "Υπηρεσίες Συμβουλευτικής"}
          </h3>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>
                {language === "tr" ? "Doğum Haritası Analizi" : language === "en" ? "Birth Chart Analysis" : "Ανάλυση Αστρικής Χάρτας"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>
                {language === "tr" ? "Karmik Rehberlik" : language === "en" ? "Karmic Guidance" : "Κάρμικη Καθοδήγηση"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>
                {language === "tr" ? "Kişisel Astroloji Danışmanlığı" : language === "en" ? "Personal Astrology Consultation" : "Προσωπική Συμβουλευτική Αστρολογίας"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>
                {language === "tr" ? "Uyumluluk Analizi" : language === "en" ? "Compatibility Analysis" : "Ανάλυση Συμβατότητας"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>
                {language === "tr" ? "Kariyer ve Finans Rehberliği" : language === "en" ? "Career and Finance Guidance" : "Καθοδήγηση Καριέρας και Χρηματοοικονομικών"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
