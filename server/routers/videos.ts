import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../db";

export const videosRouter = router({
  list: publicProcedure.query(async () => {
    return getAllVideos();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const video = await getVideoById(input.id);
      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }
      return video;
    }),

  create: protectedProcedure
    .input(
      z.object({
        titleEl: z.string().min(1),
        titleEn: z.string().min(1),
        titleTr: z.string().min(1),
        youtubeUrl: z.string().url(),
        descriptionEl: z.string().optional(),
        descriptionEn: z.string().optional(),
        descriptionTr: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return createVideo(input);
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          titleEl: z.string().optional(),
          titleEn: z.string().optional(),
          titleTr: z.string().optional(),
          youtubeUrl: z.string().url().optional(),
          descriptionEl: z.string().optional(),
          descriptionEn: z.string().optional(),
          descriptionTr: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return updateVideo(input.id, input.data);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return deleteVideo(input.id);
    }),
});
