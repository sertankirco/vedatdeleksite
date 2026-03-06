import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { invokeLLM } from "../_core/llm";
import { getUserChatMessages, createChatMessage } from "../db";

const SYSTEM_PROMPTS = {
  tr: `Sen Vedat Delek, ünlü bir astrologsun. Kullanıcıların astroloji, burç, kader ve yaşam rehberliği hakkındaki sorularına cevap ver.
  Cevaplarında mistik, bilge ve teşvik edici ol. Kişisel ve derin bir şekilde yanıt ver.
  Her cevap 2-3 paragraf olacak şekilde, Türkçe'de yanıt ver.`,

  en: `You are Vedat Delek, a renowned astrologer. Answer users' questions about astrology, zodiac signs, destiny, and life guidance.
  Be mystical, wise, and encouraging in your responses. Respond in a personal and profound way.
  Each response should be 2-3 paragraphs in English.`,

  el: `Είσαι ο Vedat Delek, ένας διάσημος αστρολόγος. Απάντησε στις ερωτήσεις των χρηστών σχετικά με την αστρολογία, τα ζώδια, την μοίρα και την καθοδήγηση της ζωής.
  Να είσαι μυστικός, σοφός και ενθαρρυντικός στις απαντήσεις σου. Απάντησε με προσωπικό και βαθύ τρόπο.
  Κάθε απάντηση πρέπει να είναι 2-3 παράγραφοι στα ελληνικά.`,
};

export const chatRouter = router({
  getMessages: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(50) }))
    .query(async ({ ctx, input }) => {
      const messages = await getUserChatMessages(ctx.user!.id, input.limit);
      return messages.reverse();
    }),

  sendMessage: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1).max(1000),
        language: z.enum(["el", "en", "tr"]).default("tr"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Save user message
      await createChatMessage({
        userId: ctx.user!.id,
        role: "user",
        content: input.content,
        language: input.language,
      });

      // Get conversation history for context
      const history = await getUserChatMessages(ctx.user!.id, 10);

      // Build messages array with history
      const messages: Array<{
        role: "system" | "user" | "assistant";
        content: string;
      }> = [
        {
          role: "system",
          content: SYSTEM_PROMPTS[input.language],
        },
      ];

      // Add recent conversation history for context
      for (const msg of history.reverse()) {
        messages.push({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        });
      }

      // Add current user message
      messages.push({
        role: "user",
        content: input.content,
      });

      try {
        // Generate AI response
        const response = await invokeLLM({
          messages: messages.slice(-10), // Keep last 10 messages for context
        });

        const assistantContent = response.choices[0]?.message?.content;
        if (typeof assistantContent !== "string") {
          throw new Error("Invalid response from LLM");
        }

        // Save assistant message
        await createChatMessage({
          userId: ctx.user!.id,
          role: "assistant",
          content: assistantContent,
          language: input.language,
        });

        return {
          userMessage: input.content,
          assistantMessage: assistantContent,
        };
      } catch (error) {
        console.error("Error generating chat response:", error);

        const errorMessage =
          input.language === "tr"
            ? "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin."
            : input.language === "en"
              ? "Sorry, an error occurred. Please try again."
              : "Συγγνώμη, παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά.";

        // Save error message
        await createChatMessage({
          userId: ctx.user!.id,
          role: "assistant",
          content: errorMessage,
          language: input.language,
        });

        return {
          userMessage: input.content,
          assistantMessage: errorMessage,
        };
      }
    }),

  clearHistory: protectedProcedure.mutation(async ({ ctx }) => {
    // Note: This would require a deleteUserChatMessages function
    // For now, we'll just return success
    return { success: true };
  }),
});
