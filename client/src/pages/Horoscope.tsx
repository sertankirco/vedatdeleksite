import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Sparkles, Loader2 } from "lucide-react";

const ZODIAC_SIGNS = [
  { id: 1, name: 'Koç', nameEn: 'Aries', icon: '♈' },
  { id: 2, name: 'Boğa', nameEn: 'Taurus', icon: '♉' },
  { id: 3, name: 'İkizler', nameEn: 'Gemini', icon: '♊' },
  { id: 4, name: 'Yengeç', nameEn: 'Cancer', icon: '♋' },
  { id: 5, name: 'Aslan', nameEn: 'Leo', icon: '♌' },
  { id: 6, name: 'Başak', nameEn: 'Virgo', icon: '♍' },
  { id: 7, name: 'Terazi', nameEn: 'Libra', icon: '♎' },
  { id: 8, name: 'Akrep', nameEn: 'Scorpio', icon: '♏' },
  { id: 9, name: 'Yay', nameEn: 'Sagittarius', icon: '♐' },
  { id: 10, name: 'Oğlak', nameEn: 'Capricorn', icon: '♑' },
  { id: 11, name: 'Kova', nameEn: 'Aquarius', icon: '♒' },
  { id: 12, name: 'Balık', nameEn: 'Pisces', icon: '♓' },
];

export default function Horoscope() {
  const [selectedZodiac, setSelectedZodiac] = useState(1);
  const { language } = useLanguage();

  const { data: horoscope, isLoading } = trpc.horoscope.getTodayByZodiac.useQuery(
    { zodiacSignId: selectedZodiac },
    { enabled: !!selectedZodiac }
  );

  const selectedSign = ZODIAC_SIGNS.find(s => s.id === selectedZodiac);

  const getHoroscopeText = () => {
    if (!horoscope) return null;
    if (language === 'tr') return horoscope.textTr;
    if (language === 'en') return horoscope.textEn;
    if (language === 'el') return horoscope.textEl;
    return horoscope.textTr;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Günlük Burç Yorumları</h1>
          <p className="text-subtitle">Vedat Delek'in yapay zeka destekli günlük tahminleri</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Zodiac Selector */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-card-title mb-6 text-slate-900 dark:text-white">Burç Seçin</h3>
              <div className="grid grid-cols-2 gap-2">
                {ZODIAC_SIGNS.map((sign) => (
                  <button
                    key={sign.id}
                    onClick={() => setSelectedZodiac(sign.id)}
                    className={`zodiac-sign-card ${selectedZodiac === sign.id ? 'active' : ''}`}
                    disabled={isLoading}
                  >
                    <div className="text-2xl mb-1">{sign.icon}</div>
                    <div className="text-xs font-semibold">{sign.name}</div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Horoscope Display */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main Horoscope Card */}
            <Card className="p-8 bg-white dark:bg-slate-900 border-blue-200 dark:border-slate-700">
              {selectedSign && (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-6xl">{selectedSign.icon}</div>
                    <div>
                      <h2 className="text-4xl font-bold text-slate-900 dark:text-white">{selectedSign.name}</h2>
                      <p className="text-slate-600 dark:text-slate-400 text-lg">{selectedSign.nameEn}</p>
                    </div>
                  </div>

                  {/* Horoscope Content */}
                  <div className="min-h-[200px] relative">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-32">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                      </div>
                    ) : horoscope ? (
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 p-6 rounded-lg border border-blue-200 dark:border-slate-700">
                        <div className="flex items-start gap-3 mb-4">
                          <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                            {getHoroscopeText() || 'Tahmin yükleniyor...'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-32 text-slate-500 dark:text-slate-400">
                        <p>Bu burç için tahmin henüz hazırlanmamış.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </Card>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 border-blue-200 dark:border-slate-700">
                <h3 className="text-card-title mb-2 text-slate-900 dark:text-white">Bugün Neler Bekleniyor?</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Vedat Delek'in yapay zeka destekli analizi ile bugünün enerjisini ve fırsatlarını keşfedin.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-slate-800 dark:to-slate-900 border-purple-200 dark:border-slate-700">
                <h3 className="text-card-title mb-2 text-slate-900 dark:text-white">Kişisel Analiz</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Doğum haritanız için özel analiz ve rehberlik almak istiyorsanız, hizmetlerimizi keşfedin.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
