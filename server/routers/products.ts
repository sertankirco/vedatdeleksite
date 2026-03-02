import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../db";

export const productsRouter = router({
  list: publicProcedure.query(async () => {
    return getAllProducts();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const product = await getProductById(input.id);
      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }
      return product;
    }),

  create: protectedProcedure
    .input(z.object({
      titleEl: z.string().min(1),
      titleEn: z.string().min(1),
      titleTr: z.string().min(1),
      descriptionEl: z.string().optional(),
      descriptionEn: z.string().optional(),
      descriptionTr: z.string().optional(),
      price: z.string().min(1),
      imageUrl: z.string().url().optional(),
      buyLink: z.string().url(),
      category: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return createProduct(input);
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      data: z.object({
        titleEl: z.string().optional(),
        titleEn: z.string().optional(),
        titleTr: z.string().optional(),
        descriptionEl: z.string().optional(),
        descriptionEn: z.string().optional(),
        descriptionTr: z.string().optional(),
        price: z.string().optional(),
        imageUrl: z.string().url().optional(),
        buyLink: z.string().url().optional(),
        category: z.string().optional(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return updateProduct(input.id, input.data);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return deleteProduct(input.id);
    }),
});
