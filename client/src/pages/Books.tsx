import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function Books() {
  const { language } = useLanguage();

  const getTitle = () => {
    if (language === "tr") return "KLİDİ KİTAP";
    if (language === "en") return "KLIDI BOOK";
    return "ΚΛΕΙΔΊ ΒΙΒΛΊΟ";
  };

  const getDescription = () => {
    if (language === "tr") {
      return "Anahtar yunanca adı ile κλειδί baskıdan çıktı raflardaki yerini almak için artık hazır. Anahtar kitabını yazarken bu kitabın başka bir noktaya gideceğini biliyordum. Türkçe Almanca ve şimdi yunancaya çevrilerek Yunanistanda satışa çıkıyor. Mini bir değişimle içeriğini değiştirmeden o kadar farklı bir yöne gittiki anlatamam. κλειδί açılması gereken kapıların kilidini açmak için çok özel rehberlik ve mucizelerle dolu.";
    }
    if (language === "en") {
      return "The Key, known in Greek as κλειδί, has just come off the press and is ready to take its place on the shelves. When I was writing the Key book, I knew this book would go in a different direction. Translated from Turkish and German into Greek, it is now being released for sale in Greece. With a small change, without changing its content, it went in such a different direction that I can hardly describe it. κλειδί is full of special guidance and miracles to open the doors that need to be opened.";
    }
    return "Το Κλειδί, γνωστό στα ελληνικά ως κλειδί, μόλις βγήκε από τον τύπο και είναι έτοιμο να πάρει τη θέση του στα ράφια. Όταν έγραφα το βιβλίο Κλειδί, ήξερα ότι αυτό το βιβλίο θα πήγαινε σε διαφορετική κατεύθυνση. Μεταφρασμένο από τα τουρκικά και τα γερμανικά στα ελληνικά, κυκλοφορεί τώρα για πώληση στην Ελλάδα. Με μια μικρή αλλαγή, χωρίς να αλλάξει το περιεχόμενό του, πήγε σε τόσο διαφορετική κατεύθυνση που δύσκολα μπορώ να το περιγράψω. Το κλειδί είναι γεμάτο ειδική καθοδήγηση και θαύματα για να ανοίξουν τις πόρτες που πρέπει να ανοίξουν.";
  };

  const getContactText = () => {
    if (language === "tr") return "Kitap Hakkında Daha Fazla Bilgi";
    if (language === "en") return "Learn More About the Book";
    return "Μάθετε Περισσότερα για το Βιβλίο";
  };

  const getContactButtonText = () => {
    if (language === "tr") return "İletişim Kurun";
    if (language === "en") return "Get in Touch";
    return "Επικοινωνήστε";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            {getTitle()}
          </h1>

          {/* Book Image */}
          <div className="mb-12 flex justify-center">
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663294098536/WWrTHtjUDvrsNKwl.png" 
              alt="KLİDİ KİTAP" 
              className="w-full max-w-md rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-md mb-12">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-center whitespace-pre-wrap">
              {getDescription()}
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">{getContactText()}</h2>
            <p className="mb-6 text-lg opacity-90">
              {language === "tr" ? "Kitap hakkında sorularınız varsa bize ulaşın." : language === "en" ? "If you have any questions about the book, please contact us." : "Εάν έχετε ερωτήσεις σχετικά με το βιβλίο, επικοινωνήστε μαζί μας."}
            </p>
            <Link href="/contact">
              <button className="bg-white text-blue-600 hover:bg-slate-100 font-bold py-3 px-8 rounded-lg transition-colors">
                {getContactButtonText()}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
