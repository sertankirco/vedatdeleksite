import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { horoscopeRouter } from "./routers/horoscope";
import { chatRouter } from "./routers/chat";
import { productsRouter } from "./routers/products";
import { blogRouter } from "./routers/blog";
import { videosRouter } from "./routers/videos";
import { productsFetchRouter } from "./routers/productsFetch";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  horoscope: horoscopeRouter,
  chat: chatRouter,
  products: router({
    ...productsRouter._def.procedures,
    ...productsFetchRouter._def.procedures,
  }),
  blog: blogRouter,
  videos: videosRouter,
});

export type AppRouter = typeof appRouter;
