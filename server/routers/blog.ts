import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../db";

export const blogRouter = router({
  list: publicProcedure.query(async () => {
    return getAllBlogPosts();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const post = await getBlogPostById(input.id);
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Blog post not found',
        });
      }
      return post;
    }),

  create: protectedProcedure
    .input(z.object({
      titleEl: z.string().min(1),
      titleEn: z.string().min(1),
      titleTr: z.string().min(1),
      excerptEl: z.string().optional(),
      excerptEn: z.string().optional(),
      excerptTr: z.string().optional(),
      contentEl: z.string().optional(),
      contentEn: z.string().optional(),
      contentTr: z.string().optional(),
      imageUrl: z.string().url().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return createBlogPost(input);
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      data: z.object({
        titleEl: z.string().optional(),
        titleEn: z.string().optional(),
        titleTr: z.string().optional(),
        excerptEl: z.string().optional(),
        excerptEn: z.string().optional(),
        excerptTr: z.string().optional(),
        contentEl: z.string().optional(),
        contentEn: z.string().optional(),
        contentTr: z.string().optional(),
        imageUrl: z.string().url().optional(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return updateBlogPost(input.id, input.data);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return deleteBlogPost(input.id);
    }),
});
