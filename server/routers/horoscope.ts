import { publicProcedure, router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { invokeLLM } from "../_core/llm";
import {
  getAllZodiacSigns,
  getHoroscopeByZodiacAndDate,
  createHoroscope,
  getTodayHoroscopes,
} from "../db";

const ZODIAC_INFO = {
  1: {
    nameTr: "Koç",
    nameEn: "Aries",
    nameEl: "Κριός",
    dates: "21 Mar - 19 Apr",
  },
  2: {
    nameTr: "Boğa",
    nameEn: "Taurus",
    nameEl: "Ταύρος",
    dates: "20 Apr - 20 May",
  },
  3: {
    nameTr: "İkizler",
    nameEn: "Gemini",
    nameEl: "Δίδυμοι",
    dates: "21 May - 20 Jun",
  },
  4: {
    nameTr: "Yengeç",
    nameEn: "Cancer",
    nameEl: "Καρκίνος",
    dates: "21 Jun - 22 Jul",
  },
  5: {
    nameTr: "Aslan",
    nameEn: "Leo",
    nameEl: "Λέων",
    dates: "23 Jul - 22 Aug",
  },
  6: {
    nameTr: "Başak",
    nameEn: "Virgo",
    nameEl: "Παρθένος",
    dates: "23 Aug - 22 Sep",
  },
  7: {
    nameTr: "Terazi",
    nameEn: "Libra",
    nameEl: "Ζυγός",
    dates: "23 Sep - 22 Oct",
  },
  8: {
    nameTr: "Akrep",
    nameEn: "Scorpio",
    nameEl: "Σκορπιός",
    dates: "23 Oct - 21 Nov",
  },
  9: {
    nameTr: "Yay",
    nameEn: "Sagittarius",
    nameEl: "Τοξότης",
    dates: "22 Nov - 21 Dec",
  },
  10: {
    nameTr: "Oğlak",
    nameEn: "Capricorn",
    nameEl: "Αιγόκερως",
    dates: "22 Dec - 19 Jan",
  },
  11: {
    nameTr: "Kova",
    nameEn: "Aquarius",
    nameEl: "Υδροχόος",
    dates: "20 Jan - 18 Feb",
  },
  12: {
    nameTr: "Balık",
    nameEn: "Pisces",
    nameEl: "Ιχθύες",
    dates: "19 Feb - 20 Mar",
  },
} as const;

async function generateHoroscopeText(
  zodiacId: number,
  language: "tr" | "en" | "el"
): Promise<string> {
  const zodiacInfo = ZODIAC_INFO[zodiacId as keyof typeof ZODIAC_INFO];
  if (!zodiacInfo) {
    throw new Error("Invalid zodiac sign");
  }

  const languageInstructions = {
    tr: `Türkçe olarak ${zodiacInfo.nameTr} (${zodiacInfo.dates}) burcu için bugünün astroloji tahminini yaz. 
    Vedat Delek'in tarzında, mistik ve rehber niteliğinde, 2-3 cümle olacak şekilde. 
    Günün enerjisi, tavsiyeler ve fırsatlar hakkında bilgi ver.`,
    en: `Write today's astrology prediction for ${zodiacInfo.nameEn} (${zodiacInfo.dates}) zodiac sign in English. 
    In Vedat Delek's style, mystical and guiding, 2-3 sentences. 
    Provide information about today's energy, advice and opportunities.`,
    el: `Γράψε την πρόβλεψη αστρολογίας της σήμερας για το ζώδιο ${zodiacInfo.nameEl} (${zodiacInfo.dates}) στα ελληνικά. 
    Στο στυλ του Vedat Delek, μυστικό και καθοδηγητικό, 2-3 προτάσεις. 
    Παρέχε πληροφορίες σχετικά με την ενέργεια της σήμερας, συμβουλές και ευκαιρίες.`,
  };

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content:
          "You are Vedat Delek, a renowned astrologer. Provide daily horoscope predictions that are mystical, insightful, and encouraging.",
      },
      {
        role: "user",
        content: languageInstructions[language],
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("Failed to generate horoscope");
  }

  return content;
}

export const horoscopeRouter = router({
  getZodiacSigns: publicProcedure.query(async () => {
    return getAllZodiacSigns();
  }),

  getTodayByZodiac: publicProcedure
    .input(z.object({ zodiacSignId: z.number().min(1).max(12) }))
    .query(async ({ input }) => {
      const today = new Date().toISOString().split("T")[0];
      const horoscope = await getHoroscopeByZodiacAndDate(
        input.zodiacSignId,
        today
      );

      if (horoscope) {
        return horoscope;
      }

      // If horoscope doesn't exist, generate it
      try {
        const textTr = await generateHoroscopeText(input.zodiacSignId, "tr");
        const textEn = await generateHoroscopeText(input.zodiacSignId, "en");
        const textEl = await generateHoroscopeText(input.zodiacSignId, "el");

        await createHoroscope({
          zodiacSignId: input.zodiacSignId,
          date: today,
          textTr,
          textEn,
          textEl,
        });

        return {
          zodiacSignId: input.zodiacSignId,
          date: today,
          textTr,
          textEn,
          textEl,
          createdAt: new Date(),
        };
      } catch (error) {
        console.error("Error generating horoscope:", error);
        // Return a default message if generation fails
        return {
          zodiacSignId: input.zodiacSignId,
          date: today,
          textTr: "Bugünün tahmini hazırlanıyor...",
          textEn: "Today's prediction is being prepared...",
          textEl: "Η πρόβλεψη της σήμερας προετοιμάζεται...",
          createdAt: new Date(),
        };
      }
    }),

  getTodayAll: publicProcedure.query(async () => {
    return getTodayHoroscopes();
  }),

  // Admin procedure to regenerate all horoscopes for today
  regenerateToday: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    try {
      const zodiacSigns = await getAllZodiacSigns();
      const today = new Date().toISOString().split("T")[0];

      for (const zodiac of zodiacSigns) {
        const existing = await getHoroscopeByZodiacAndDate(zodiac.id, today);

        if (!existing) {
          const textTr = await generateHoroscopeText(zodiac.id, "tr");
          const textEn = await generateHoroscopeText(zodiac.id, "en");
          const textEl = await generateHoroscopeText(zodiac.id, "el");

          await createHoroscope({
            zodiacSignId: zodiac.id,
            date: today,
            textTr,
            textEn,
            textEl,
          });
        }
      }

      return { success: true, message: "All horoscopes regenerated for today" };
    } catch (error) {
      console.error("Error regenerating horoscopes:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to regenerate horoscopes",
      });
    }
  }),
});
