import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Sparkles } from "lucide-react";

export default function Biography() {
  const { language } = useLanguage();

  const getTitle = () => {
    if (language === "tr") return "Vedat Delek - Biyografi";
    if (language === "en") return "Vedat Delek - Biography";
    return "Vedat Delek - Βιογραφία";
  };

  const getSubtitle = () => {
    if (language === "tr") return "Ünlü Astrolog Vedat Delek Hakkında";
    if (language === "en") return "About Renowned Astrologer Vedat Delek";
    return "Σχετικά με τον Διάσημο Αστρολόγο Vedat Delek";
  };

  const getBiographyText = () => {
    if (language === "tr") {
      return `2014 yılında İstanbul Aydın Üniversitesi'nin açmış olduğu Astroloji Akademisinde temel-orta-ileri seviye eğitimlerini başarı ile tamamlayarak YÖK onaylı sertifikaları girdiğim sınavlar neticesinde almaya hak kazandım.

2014 yılında astrolog akademisi öğrencisi olarak eğitimlerime devam etmekteyim. Dönem aldığım dersler sonucunda eğilimlerime ve araştırmalarıma devam etmekteyim. 2015 yılında "Astroloji ile Hayatınızı Değiştirin" adlı ilk kehanet kitabımı piyasaya çıkarttıktan sonra her yıl, yıl gelmeden olabilecekleri kaleme aldığım "Para, Şans, Aşk Seninle", "Gökyüzü Mucizeleri", "Şükret Olsun", "İyilik Yap, İyilik Bul" Niyet Ettim, Akışta Kal adlı kitaplarım ile hayatlarınıza dokunmaya devam ediyorum.

Anahtar adlı kitabı Almanca ve Yunancaya çevrilerek yayınlandı.

2018'de Dünya'da ilk kez işitme engelliler için işaret dili ile burç yorumlarını Uluslararası İşitme Engelliler Federasyonu Başkanı ile ortak yaptığımız çalışmada işitme engelli astroloji severlere sundum.

2019 yılında çıkardığım "İyilik Yap, İyilik Bul" adlı kitabıyla beraber 23 Kasım 2019 yılında YouTube kanalımda yayında olan 2020 yılı kehanetlerimden oluşan, güçlü bir ekiple müziğini yaptığımız "2020" adlı rap şarkısını astroloji severlere Dünya'da bir ilk olarak sundum.

Astroloji dünyasında yapılmayanı yapmaya çalışan astrolojinin hizmetkarı bir astrologum.

Business Channel Türk TV ekranlarında her Pazar yayınlanan 250 bölüme ulaşan programlarımda haftalık astroloji yorumlarımı astroloji severlere sunmaya devam ediyorum.

Almanya, Hollanda, İsviçre, İngiltere'de yapmış olduğum söyleşiler ve danışmanlıklarım yurt içi ve yurt dışı olmak üzere devam etmektedir.

2022 yılında olabilecekleri animasyon çizgi film olarak astroloji severlerin beğenisine YouTube kanalımda yayınlayarak sunduk.

Astroloji ve tarot ile ilgili eğitim vermeye devam etmekteyim.

Birçok sosyal sorumluluk projesini astroloji severler ile birlikte yapmaya devam edeceğiz.

2022 & 2025 yılları arasında Beyaz Tv youtube kanalında Sunucu Nur Viral ile haftalık burç yorumları programını hazırladı.

2015 & 2025 yılları arasında 18 kitap yazarak bir rekora imza atmıştır.`;
    }
    if (language === "en") {
      return `In 2014, I successfully completed basic, intermediate, and advanced level astrology training at the Astrology Academy established by Istanbul Aydın University, earning YÖK-approved certificates through the exams I took.

Since 2014, I have continued my education as an astrology academy student. Following the courses I took each semester, I continued my inclinations and research. After releasing my first prophecy book "Change Your Life with Astrology" in 2015, I have continued to touch people's lives with books such as "Money, Luck, Love with You", "Miracles of the Sky", "Be Grateful", "Do Good, Find Good", "I Decided, Stay in Flow" that I write each year predicting what could happen before the year arrives.

My book "Key" was translated into German and Greek and published.

In 2018, for the first time in the world, I presented zodiac readings in sign language for the hearing impaired in a collaborative work with the President of the International Federation of the Deaf, introducing astrology to hearing-impaired enthusiasts.

In 2019, along with my book "Do Good, Find Good", I presented a world first to astrology enthusiasts - a rap song called "2020" that we created with a strong team, consisting of my 2020 prophecies broadcast on my YouTube channel on November 23, 2019.

I am an astrologer, a servant of astrology trying to do what hasn't been done in the astrology world.

I continue to present my weekly astrology commentaries to astrology enthusiasts in my programs on Business Channel Turkish TV that have reached 250 episodes aired every Sunday.

My lectures and consultations in Germany, Netherlands, Switzerland, and England continue both domestically and internationally.

In 2022, we presented predictions as an animated cartoon series to the appreciation of astrology enthusiasts on my YouTube channel.

I continue to provide training in astrology and tarot.

We will continue to carry out many social responsibility projects together with astrology enthusiasts.

Between 2022 & 2025, I prepared a weekly zodiac commentary program with presenter Nur Viral on Beyaz TV YouTube channel.

Between 2015 & 2025, I have set a record by writing 18 books.`;
    }
    return `Το 2014, ολοκλήρωσα με επιτυχία τη βασική, ενδιάμεση και προχωρημένη κατάρτιση αστρολογίας στην Ακαδημία Αστρολογίας που ιδρύθηκε από το Πανεπιστήμιο Istanbul Aydın, κερδίζοντας πιστοποιητικά εγκεκριμένα από το YÖK μέσω των εξετάσεων που έδωσα.

Από το 2014, συνέχισα την εκπαίδευσή μου ως φοιτητής της ακαδημίας αστρολογίας. Ακολουθώντας τα μαθήματα που παρακολούθησα κάθε εξάμηνο, συνέχισα τις ροπές και τις έρευνές μου. Μετά την κυκλοφορία του πρώτου μου βιβλίου προφητείας "Αλλάξτε τη Ζωή σας με Αστρολογία" το 2015, συνέχισα να αγγίζω τη ζωή των ανθρώπων με βιβλία όπως "Χρήματα, Τύχη, Αγάπη Μαζί σας", "Θαύματα του Ουρανού", "Να Είστε Ευγνώμονες", "Κάντε Καλό, Βρείτε Καλό", "Αποφάσισα, Παραμείνετε στη Ροή" που γράφω κάθε χρόνο προβλέποντας τι θα μπορούσε να συμβεί πριν φτάσει το χρόνο.

Το βιβλίο μου "Κλειδί" μεταφράστηκε στα γερμανικά και ελληνικά και δημοσιεύθηκε.

Το 2018, για πρώτη φορά στον κόσμο, παρουσίασα ωροσκόπια σε νοηματική γλώσσα για τα άτομα με προβλήματα ακοής σε συνεργατική εργασία με τον Πρόεδρο της Διεθνούς Ομοσπονδίας Κωφών, εισάγοντας την αστρολογία σε ενθουσιώδεις ανθρώπους με προβλήματα ακοής.

Το 2019, μαζί με το βιβλίο μου "Κάντε Καλό, Βρείτε Καλό", παρουσίασα ένα παγκόσμιο πρώτο στους ενθουσιώδεις αστρολογίας - ένα τραγούδι rap που ονομάζεται "2020" που δημιουργήσαμε με μια δυνατή ομάδα, αποτελούμενο από τις προφητείες μου για το 2020 που μεταδόθηκαν στο κανάλι YouTube μου στις 23 Νοεμβρίου 2019.

Είμαι αστρολόγος, υπηρέτης της αστρολογίας που προσπαθεί να κάνει αυτό που δεν έχει γίνει στον κόσμο της αστρολογίας.

Συνεχίζω να παρουσιάζω τα εβδομαδιαία σχόλιά μου για την αστρολογία στους ενθουσιώδεις αστρολογίας στα προγράμματά μου στο Business Channel Turkish TV που έχουν φτάσει τα 250 επεισόδια που προβάλλονται κάθε Κυριακή.

Οι διαλέξεις και οι συμβουλές μου στη Γερμανία, τις Κάτω Χώρες, την Ελβετία και την Αγγλία συνεχίζονται τόσο εγχωρίως όσο και διεθνώς.

Το 2022, παρουσιάσαμε προβλέψεις ως μια κινούμενη σειρά κινουμένων σχεδίων στην εκτίμηση των ενθουσιωδών αστρολογίας στο κανάλι YouTube μου.

Συνεχίζω να παρέχω κατάρτιση σε αστρολογία και ταρώ.

Θα συνεχίσουμε να διεξάγουμε πολλά έργα κοινωνικής ευθύνης μαζί με ενθουσιώδεις αστρολογίας.

Μεταξύ 2022 & 2025, προετοίμασα ένα εβδομαδιαίο πρόγραμμα σχολίων ωροσκοπίου με τη δημοσιογράφο Nur Viral στο κανάλι YouTube Beyaz TV.

Μεταξύ 2015 & 2025, έχω θέσει ένα ρεκόρ γράφοντας 18 βιβλία.`;
  };

  const paragraphs = getBiographyText().split("\n\n");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {getTitle()}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            {getSubtitle()}
          </p>
        </div>

        {/* Main Biography */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="w-full">
              {paragraphs.map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Highlight */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              20+
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {language === "tr"
                ? "Yıllık Deneyim"
                : language === "en"
                  ? "Years of Experience"
                  : "Χρόνια Εμπειρίας"}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              18
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {language === "tr"
                ? "Yayınlanmış Kitap"
                : language === "en"
                  ? "Published Books"
                  : "Δημοσιευμένα Βιβλία"}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">
              250+
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {language === "tr"
                ? "TV Programı Bölümü"
                : language === "en"
                  ? "TV Program Episodes"
                  : "Επεισόδια Τηλεοπτικού Προγράμματος"}
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            {language === "tr"
              ? "Başarılar ve Başarılar"
              : language === "en"
                ? "Achievements and Accomplishments"
                : "Επιτεύγματα και Κατακτήσεις"}
          </h2>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>
                {language === "tr"
                  ? "YÖK Onaylı Astroloji Sertifikaları"
                  : language === "en"
                    ? "YÖK Approved Astrology Certificates"
                    : "Πιστοποιητικά Αστρολογίας Εγκεκριμένα από YÖK"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>
                {language === "tr"
                  ? "18 Yayınlanmış Kitap (2015-2025)"
                  : language === "en"
                    ? "18 Published Books (2015-2025)"
                    : "18 Δημοσιευμένα Βιβλία (2015-2025)"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>
                {language === "tr"
                  ? "Uluslararası İşitme Engelliler Federasyonu ile İşaret Dili Burç Yorumları Projesi"
                  : language === "en"
                    ? "Sign Language Zodiac Readings Project with International Federation of the Deaf"
                    : "Έργο Ανάγνωσης Ζωδίων σε Νοηματική Γλώσσα με τη Διεθνή Ομοσπονδία Κωφών"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>
                {language === "tr"
                  ? "Business Channel Türk TV'de 250+ Bölüm Sunuş"
                  : language === "en"
                    ? "250+ Episodes on Business Channel Turkish TV"
                    : "250+ Επεισόδια στο Business Channel Turkish TV"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>
                {language === "tr"
                  ? "Uluslararası Söyleşi ve Danışmanlık (Almanya, Hollanda, İsviçre, İngiltere)"
                  : language === "en"
                    ? "International Lectures and Consulting (Germany, Netherlands, Switzerland, UK)"
                    : "Διεθνείς Διαλέξεις και Συμβουλές (Γερμανία, Κάτω Χώρες, Ελβετία, ΗΒ)"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>
                {language === "tr"
                  ? "Animasyon Çizgi Film Serileri ve Müzik Prodüksiyonu"
                  : language === "en"
                    ? "Animated Series and Music Production"
                    : "Κινούμενες Σειρές και Μουσική Παραγωγή"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>
                {language === "tr"
                  ? "Beyaz TV YouTube Kanalında Haftalık Program Sunuşu (2022-2025)"
                  : language === "en"
                    ? "Weekly Program on Beyaz TV YouTube Channel (2022-2025)"
                    : "Εβδομαδιαίο Πρόγραμμα στο Κανάλι YouTube Beyaz TV (2022-2025)"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
