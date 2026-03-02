import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function Shop() {
  const { language } = useLanguage();
  const { data: products, isLoading } = trpc.products.list.useQuery();

  const getTitle = (product: any) => {
    if (language === "tr") return product.titleTr;
    if (language === "en") return product.titleEn;
    return product.titleEl;
  };

  const getDescription = (product: any) => {
    if (language === "tr") return product.descriptionTr;
    if (language === "en") return product.descriptionEn;
    return product.descriptionEl;
  };

  const getHeaderText = () => {
    if (language === "tr") return "Astroloji Hizmetleri";
    if (language === "en") return "Astrology Services";
    return "Υπηρεσίες Αστρολογίας";
  };

  const getSubHeaderText = () => {
    if (language === "tr") return "Vedat Delek'in özel danışmanlık ve analiz hizmetleri";
    if (language === "en") return "Vedat Delek's exclusive consulting and analysis services";
    return "Αποκλειστικές υπηρεσίες συμβουλευτικής και ανάλυσης του Vedat Delek";
  };

  const getEmptyText = () => {
    if (language === "tr") return "Şu anda hiçbir hizmet bulunmamaktadır. Lütfen daha sonra tekrar kontrol edin.";
    if (language === "en") return "No services available at the moment. Please check back later.";
    return "Δεν υπάρχουν διαθέσιμες υπηρεσίες αυτή τη στιγμή. Παρακαλώ ελέγξτε αργότερα.";
  };

  const getConsultationTitle = () => {
    if (language === "tr") return "Kişisel Danışmanlık";
    if (language === "en") return "Personal Consultation";
    return "Προσωπική Συμβουλευτική";
  };

  const getConsultationText = () => {
    if (language === "tr") return "Vedat Delek ile doğrudan iletişim kurmak ve özel danışmanlık almak için lütfen iletişim bilgilerimizi ziyaret edin.";
    if (language === "en") return "To contact Vedat Delek directly and receive personalized consultation, please visit our contact information.";
    return "Για να επικοινωνήσετε απευθείας με τον Vedat Delek και να λάβετε προσωπική συμβουλευτική, επισκεφθείτε τις πληροφορίες επικοινωνίας μας.";
  };

  const getContactButtonText = () => {
    if (language === "tr") return "İletişim Bilgileri";
    if (language === "en") return "Contact Information";
    return "Πληροφορίες Επικοινωνίας";
  };

  const getBuyButtonText = () => {
    if (language === "tr") return "Satın Al";
    if (language === "en") return "Buy Now";
    return "Αγορά";
  };

  const isValidEtsyUrl = (url: string) => {
    return url && (url.includes("etsy.com") || url.includes("https://") || url.includes("http://"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {getHeaderText()}
          </h1>
          <p className="text-subtitle">
            {getSubHeaderText()}
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="card-astro overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 flex flex-col">
                {/* Product Image Container */}
                {product.imageUrl ? (
                  <div className="w-full h-64 overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <img
                      src={product.imageUrl}
                      alt={getTitle(product)}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-blue-400 opacity-50" />
                  </div>
                )}

                {/* Product Info */}
                <div className="flex-1 flex flex-col p-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-card-title mb-2 text-slate-900 dark:text-white line-clamp-2">
                    {getTitle(product)}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                    {getDescription(product)}
                  </p>

                  {/* Category Badge */}
                  {product.category && (
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                        {product.category}
                      </span>
                    </div>
                  )}

                  {/* Buy Button or Warning */}
                  <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                    {isValidEtsyUrl(product.buyLink) ? (
                      <a
                        href={product.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button className="btn-astro-primary w-full">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          {getBuyButtonText()}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    ) : (
                      <Button disabled className="w-full opacity-50">
                        {language === "tr" ? "Satış Linki Hazırlanıyor" : language === "en" ? "Purchase Link Coming Soon" : "Ο σύνδεσμος αγοράς έρχεται σύντομα"}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {getEmptyText()}
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {getConsultationTitle()}
          </h2>
          <p className="mb-6 text-lg opacity-90">
            {getConsultationText()}
          </p>
          <Link href="/contact" className="inline-block">
            <Button className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3 font-semibold rounded-lg">
              {getContactButtonText()}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
