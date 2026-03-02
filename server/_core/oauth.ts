import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";
import axios from "axios";
import { ENV } from "./env";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code) {
      res.status(400).json({ error: "code is required" });
      return;
    }

    try {
      // Decode state to get redirect URI, or fallback to referrer origin + path
      let redirectUri = `${req.protocol}://${req.get('host')}/api/oauth/callback`;
      if (state) {
        try {
          redirectUri = Buffer.from(state, 'base64').toString('ascii');
        } catch {
          // ignore error
        }
      }

      // Exchange code for token
      const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: ENV.googleClientId,
        client_secret: ENV.googleClientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      });

      const { access_token } = tokenResponse.data;

      // Fetch user profile
      const userResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      const userInfo = userResponse.data;
      if (!userInfo.id) {
        res.status(400).json({ error: "id missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.id,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: "google",
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.id, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
