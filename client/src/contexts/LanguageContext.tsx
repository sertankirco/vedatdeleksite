import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'tr' | 'en' | 'el';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  tr: {
    'nav.home': 'Ana Sayfa',


    'nav.blog': 'Blog',
    'nav.videos': 'Videolar',
    'nav.shop': 'Mağaza',
    'nav.admin': 'Yönetim',
    'nav.login': 'Giriş Yap',
    'nav.logout': 'Çıkış Yap',
    'nav.profile': 'Profil',
    'footer.rights': '© 2024 Vedat Delek Astroloji Platformu. Tüm hakları saklıdır.',
    'footer.tagline': 'Yıldızlar aracılığıyla yaşamı anlamak ve geleceği şekillendirmek.',
    'home.hero.title': 'Yıldızların Rehberliğinde Kaderinizi Keşfedin',
    'home.hero.subtitle': 'Astrolog Vedat Delek\'in İnternet Sitesine Hoşgeldiniz',
    'home.features.title': 'Neler Sunuyoruz?',
    'home.title': 'Vedat Delek - Astroloji Platformu',
    'home.features.feature1.title': 'Kişisel Astroloji Danışmanlığı',
    'home.features.feature1.description': 'Doğum haritası analizi ve karmik rehberlik ile özel danışmanlık hizmetleri',
    'home.features.feature2.title': 'Astroloji Rehberi',
    'home.features.feature2.description': 'Blog yazıları ve video içeriği ile derinlemesine bilgi',
    'home.features.feature3.title': 'Yıldızların Gücü',
    'home.features.feature3.description': 'Evrensel enerjileri anlamak ve yaşamınızı dönüştürmek',
    'home.cta.title': 'Kişisel Astroloji Hizmetleri',
    'home.cta.subtitle': 'Doğum haritası analizi, karmik rehberlik ve daha fazlası için Vedat Delek\'in premium hizmetlerini keşfedin.',
    'home.cta.button': 'Hizmetleri Gözat',


    'shop.title': 'Astroloji Hizmetleri',
    'shop.subtitle': 'Vedat Delek\'in özel danışmanlık ve analiz hizmetleri',
    'shop.buy': 'Satın Al',
    'shop.empty': 'Şu anda hiçbir hizmet bulunmamaktadır. Lütfen daha sonra tekrar kontrol edin.',
    'blog.title': 'Astroloji Blog',
    'blog.subtitle': 'Vedat Delek\'in yazıları ve astroloji rehberi',
    'blog.empty': 'Henüz blog yazısı yayınlanmamıştır.',
    'videos.title': 'Video Galerisi',
    'videos.subtitle': 'Astroloji hakkında video içerikleri',
    'videos.empty': 'Henüz video yayınlanmamıştır.',
    'contact.title': 'Kişisel Danışmanlık',
    'contact.subtitle': 'Vedat Delek ile Doğrudan İletişim Kurun',
    'contact.description': 'Doğum haritası analizi, karmik rehberlik ve kişisel astroloji danışmanlığı için Vedat Delek ile iletişime geçin.',
    'contact.follow': 'Sosyal Medyada Takip Edin',
    'contact.follow.desc': 'Günlük burç yorumları, astroloji ipuçları ve özel duyurular için sosyal medya hesaplarımızı takip edin.',
    'contact.instagram': 'Instagram',
    'contact.youtube': 'YouTube',
    'contact.twitter': 'X (Twitter)',
    'contact.facebook': 'Facebook',
    'contact.email': 'E-posta',
    'contact.email.desc': 'Özel danışmanlık için e-posta gönderin',
    'contact.back': 'Geri Dön',
    'home.kilidi.description': 'Astrolog Vedat Delek, okuyucularına Meryem Ana ile derin bir bağ oluşturma fırsatı sunmaktadır. Kitap, Irakleitos Books yayınları tarafından yayınlanmış ve Yunanistan\'da seçili kitapçılarda mevcuttur. Ayrıca, Delek, burçlar ve melekler arasındaki sembolik ilişkileri ve astroloji ile Meryem Ana arasındaki ruhani bağı geniş kitleye ilk kez sunmaktadır. Kitapta yer alan bilgiler ve çalışmalar, tüm yaşamınız boyunca ruhani etki için bir fırsat sunmaktadır. Meryem Ana\'nın mesajları ve yardımı aracılığıyla güçlendirilmek, yaşamınızda önemli bir anahtar olabilir. Bu anahtara ulaşmak ister misiniz?',
  },
  en: {
    'nav.home': 'Home',


    'nav.blog': 'Blog',
    'nav.videos': 'Videos',
    'nav.shop': 'Shop',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.profile': 'Profile',
    'footer.rights': '© 2024 Vedat Delek Astrology Platform. All rights reserved.',
    'footer.tagline': 'Understanding life through the stars and shaping your future.',
    'home.hero.title': 'Discover Your Destiny Under the Stars',
    'home.hero.subtitle': 'Welcome to Astrologer Vedat Delek\'s Website',
    'home.features.title': 'What We Offer',
    'home.title': 'Vedat Delek - Astrology Platform',
    'home.features.feature1.title': 'Personal Astrology Consultation',
    'home.features.feature1.description': 'Special consultation services with birth chart analysis and karmic guidance',
    'home.features.feature2.title': 'Astrology Guide',
    'home.features.feature2.description': 'In-depth information with blog articles and video content',
    'home.features.feature3.title': 'Power of the Stars',
    'home.features.feature3.description': 'Understanding universal energies and transforming your life',
    'home.cta.title': 'Personal Astrology Services',
    'home.cta.subtitle': 'Discover Vedat Delek\'s premium services for birth chart analysis, karmic guidance and more.',
    'home.cta.button': 'Browse Services',

    'shop.title': 'Astrology Services',
    'shop.subtitle': 'Vedat Delek\'s special consulting and analysis services',
    'shop.buy': 'Buy Now',
    'shop.empty': 'No services available at the moment. Please check back later.',
    'blog.title': 'Astrology Blog',
    'blog.subtitle': 'Articles and astrology guides from Vedat Delek',
    'blog.empty': 'No blog posts published yet.',
    'videos.title': 'Video Gallery',
    'videos.subtitle': 'Video content about astrology',
    'videos.empty': 'No videos published yet.',
    'contact.title': 'Personal Consultation',
    'contact.subtitle': 'Contact Vedat Delek Directly',
    'contact.description': 'Contact Vedat Delek for birth chart analysis, karmic guidance, and personal astrology consultation.',
    'contact.follow': 'Follow on Social Media',
    'contact.follow.desc': 'Follow our social media accounts for daily horoscopes, astrology tips, and special announcements.',
    'contact.instagram': 'Instagram',
    'contact.youtube': 'YouTube',
    'contact.twitter': 'X (Twitter)',
    'contact.facebook': 'Facebook',
    'contact.email': 'Email',
    'contact.email.desc': 'Send an email for special consultation',
    'contact.back': 'Go Back',
    'home.kilidi.description': 'Astrologer Vedat Delek offers readers the opportunity to create a deep bond with the Virgin Mary. The book has been published by Irakleitos Books and is available in selected bookstores in Greece. Additionally, Delek presents for the first time to the general public the symbolic relationships between the zodiac signs and angels, as well as the spiritual connection between astrology and the Virgin Mary. The information and studies contained in the book offer an opportunity for spiritual influence throughout your life. Strengthening yourself through the messages and help of the Virgin Mary can be an important key in your life. Do you want to reach this key?',
  },
  el: {
    'nav.home': 'Αρχική',


    'nav.blog': 'Blog',
    'nav.videos': 'Βίντεο',
    'nav.shop': 'Κατάστημα',
    'nav.admin': 'Διαχείριση',
    'nav.login': 'Σύνδεση',
    'nav.logout': 'Αποσύνδεση',
    'nav.profile': 'Προφίλ',
    'footer.rights': '© 2024 Πλατφόρμα Αστρολογίας Vedat Delek. Όλα τα δικαιώματα διατηρούνται.',
    'footer.tagline': 'Κατανοώντας τη ζωή μέσω των αστέρων και διαμορφώνοντας το μέλλον σας.',
    'home.hero.title': 'Ανακαλύψτε το Πεπρωμένο σας Κάτω από τα Αστέρια',
    'home.hero.subtitle': 'Καλώς ήρθατε στο Δικτυακό Τόπο του Αστρολόγου Vedat Delek',
    'home.features.title': 'Τι Προσφέρουμε',
    'home.title': 'Vedat Delek - Πλατφόρμα Αστρολογίας',
    'home.features.feature1.title': 'Προσωπική Συμβουλευτική Αστρολογίας',
    'home.features.feature1.description': 'Ειδικές υπηρεσίες συμβουλευτικής με ανάλυση αστρικής χάρτας και κάρμικη καθοδήγηση',
    'home.features.feature2.title': 'Οδηγός Αστρολογίας',
    'home.features.feature2.description': 'Βαθύ περιεχόμενο με άρθρα και βίντεο',
    'home.features.feature3.title': 'Δύναμη των Αστέρων',
    'home.features.feature3.description': 'Κατανοώντας τις καθολικές ενέργειες και μετασχηματίζοντας τη ζωή σας',
    'home.cta.title': 'Υπηρεσίες Προσωπικής Αστρολογίας',
    'home.cta.subtitle': 'Ανακαλύψτε τις premium υπηρεσίες του Vedat Delek για ανάλυση αστρική χάρτα, κάρμικη καθοδήγηση και άλλα.',
    'home.cta.button': 'Περιήγηση Υπηρεσιών',

    'shop.title': 'Υπηρεσίες Αστρολογίας',
    'shop.subtitle': 'Ειδικές υπηρεσίες συμβουλευτικής και ανάλυσης του Vedat Delek',
    'shop.buy': 'Αγορά',
    'shop.empty': 'Δεν υπάρχουν διαθέσιμες υπηρεσίες αυτή τη στιγμή. Παρακαλώ ελέγξτε αργότερα.',
    'blog.title': 'Blog Αστρολογίας',
    'blog.subtitle': 'Άρθρα και οδηγοί αστρολογίας από τον Vedat Delek',
    'blog.empty': 'Δεν έχουν δημοσιευθεί ακόμη άρθρα blog.',
    'videos.title': 'Συλλογή Βίντεο',
    'videos.subtitle': 'Περιεχόμενο βίντεο σχετικά με την αστρολογία',
    'videos.empty': 'Δεν έχουν δημοσιευθεί ακόμη βίντεο.',
    'admin.login': 'Πρέπει να συνδεθείτε',
    'admin.login.text': 'Παρακαλώ συνδεθείτε για να αποκτήσετε πρόσβαση στον πίνακα διαχείρισης.',
    'admin.forbidden': 'Η πρόσβαση απορρίφθηκε',
    'admin.forbidden.text': 'Χρειάζεστε δικαιώματα διαχειριστή για να αποκτήσετε πρόσβαση σε αυτή τη σελίδα.',
    'admin.home': 'Αρχική σελίδα',
    'admin.dashboard': 'Πίνακας Ελέγχου',
    'admin.blog': 'Blog',
    'admin.videos': 'Βίντεο',
    'admin.products': 'Προϊόντα',
    'admin.settings': 'Ρυθμίσεις',
    'admin.welcome': 'Καλώς ήρθατε',
    'admin.info': 'Χρησιμοποιήστε τον πίνακα διαχείρισης για να διαχειριστείτε τα άρθρα blog, τα βίντεο και τα προϊόντα.',
    'admin.total_users': 'Σύνολο Χρηστών',
    'admin.blog_posts': 'Άρθρα Blog',
    'admin.videos_count': 'Βίντεο',
    'admin.products_count': 'Προϊόντα',
    'admin.ai_settings': 'Ρυθμίσεις AI',
    'admin.coming_soon': 'Σύντομα',
    'profile.title': 'Το Προφίλ μου',
    'profile.subtitle': 'Διαχειριστείτε τις πληροφορίες λογαριασμού',
    'profile.about': 'Σχετικά με τον Vedat Delek',
    'profile.email': 'Ηλεκτρονικό ταχυδρομείο',
    'profile.member_since': 'Μέλος από',
    'profile.login_method': 'Μέθοδος Σύνδεσης',
    'profile.preferences': 'Προτιμήσεις',
    'profile.birth_chart': 'Χάρτης Γέννησης',
    'profile.back_home': 'Πίσω στην Αρχική',
    'profile.logout': 'Αποσύνδεση',
    'contact.title': 'Προσωπική Συμβουλευτική',
    'contact.subtitle': 'Επικοινωνήστε Απευθείας με τον Vedat Delek',
    'contact.description': 'Επικοινωνήστε με τον Vedat Delek για ανάλυση αστρικής χάρτας, κάρμικη καθοδήγηση και προσωπική συμβουλευτική αστρολογίας.',
    'contact.follow': 'Ακολουθήστε στα Κοινωνικά Μέσα',
    'contact.follow.desc': 'Ακολουθήστε τους λογαριασμούς μας στα κοινωνικά μέσα για καθημερινά ωροσκόπια, συμβουλές αστρολογίας και ειδικές ανακοινώσεις.',
    'contact.instagram': 'Instagram',
    'contact.youtube': 'YouTube',
    'contact.twitter': 'X (Twitter)',
    'contact.facebook': 'Facebook',
    'contact.email': 'Ηλεκτρονικό Ταχυδρομείο',
    'contact.email.desc': 'Στείλτε ένα email για ειδική συμβουλευτική',
    'contact.back': 'Πίσω',
    'home.kilidi.description': 'Ο αστρολόγος Vedat Delek προσφέρει στους αναγνώστες του την ευκαιρία να δημιουργήσουν έναν βαθύ δεσμό με την Παναγία. Το βιβλίο έχει εκδοθεί από τις εκδόσεις Irakleitos Books και είναι διαθέσιμο σε επιλεγμένα βιβλιοπωλεία στην Ελλάδα. Επιπλέον, ο Delek παρουσιάζει για πρώτη φορά στο ευρύ κοινό τις συμβολικές σχέσεις μεταξύ των ζωδίων και των αγγέλων, καθώς και τον πνευματικό δεσμό μεταξύ της αστρολογίας και της Παναγίας. Οι πληροφορίες και οι μελέτες που περιέχονται στο βιβλίο προσφέρουν μια ευκαιρία για πνευματική επίδραση σε όλη σας τη ζωή. Η ενίσχυση σας μέσω των μηνυμάτων και της βοήθειας της Παναγίας μπορεί να αποτελέσει ένα σημαντικό κλειδί στη ζωή σας. Θέλετε να φτάσετε σε αυτό το κλειδί;',
  },
};

function detectBrowserLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('tr')) {
    return 'tr';
  } else if (browserLang.startsWith('en')) {
    return 'en';
  } else if (browserLang.startsWith('el') || browserLang.startsWith('gr')) {
    return 'el';
  }
  
  return 'el'; // Varsayılan dil Yunanca
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('el');

  useEffect(() => {
    // Önce localStorage'da kaydedilmiş dil tercihini kontrol et
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && ['tr', 'en', 'el'].includes(saved)) {
      setLanguageState(saved);
      return;
    }

    // localStorage'da yoksa tarayıcı dilini algıla
    const detectedLanguage = detectBrowserLanguage();
    setLanguageState(detectedLanguage);
    localStorage.setItem('language', detectedLanguage);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
