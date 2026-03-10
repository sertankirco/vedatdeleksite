import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "../_core/cookies";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { sdk } from "../_core/sdk";
import * as db from "../db";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

export const authRouter = router({
  me: publicProcedure.query(opts => opts.ctx.user),

  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.username !== "admin" || input.password !== "369258") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bilinmeyen kullanıcı adı veya şifre",
        });
      }

      // Create a fake static user object for the admin
      const staticAdminUser = {
        id: 1,
        openId: "admin",
        name: "Admin",
        email: "admin@astro.net",
        role: "admin",
        loginMethod: "local",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
        password: "", // not needed in response
      };

      const sessionToken = await sdk.createSessionToken("admin", {
        name: "Admin",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
      });

      return { success: true, user: staticAdminUser };
    }),

  logout: publicProcedure.mutation(({ ctx }) => {
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    return {
      success: true,
    } as const;
  }),
});
