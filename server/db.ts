import { eq, desc, and } from "drizzle-orm";
import {
  InsertUser,
  users,
  zodiacSigns,
  horoscopes,
  products,
  blogPosts,
  videos,
  chatMessages,
  userPreferences,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { fileURLToPath } from "url";

let _db: any = null;
let _sqlite: Database.Database | null = null;

function getDbPath(): string {
  // Try multiple approaches to find the db file in case CWD is unexpected
  const candidates = [
    path.resolve(process.cwd(), "sqlite.db"),
    // Use __dirname-equivalent for ESM to find the file relative to this file's location
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "sqlite.db"),
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "sqlite.db"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      console.log(`[Database] Found sqlite.db at: ${candidate}`);
      return candidate;
    }
  }

  // If not found, return the default path and let the Database constructor create it
  const defaultPath = path.resolve(process.cwd(), "sqlite.db");
  console.log(`[Database] sqlite.db not found, will create at: ${defaultPath}`);
  return defaultPath;
}

export async function getDb() {
  if (!_db) {
    try {
      const dbPath = getDbPath();
      console.log(`[Database] Connecting to: ${dbPath}`);

      if (!_sqlite) {
        _sqlite = new Database(dbPath);
        _sqlite.pragma("journal_mode = WAL");
        console.log("[Database] Connection established.");
      }
      _db = drizzle(_sqlite);
    } catch (error) {
      console.error("[Database] Connection failed:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId && !user.email) {
    throw new Error("User openId or email is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
      email: user.email,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "password", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    } else {
      try {
        const existingUsers = await db
          .select({ id: users.id })
          .from(users)
          .limit(1);
        if (existingUsers.length === 0) {
          values.role = "admin";
          updateSet.role = "admin";
        }
      } catch (err) {
        console.warn("[Database] Could not verify user count, defaulting to user role", err);
      }
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date().toISOString();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date().toISOString();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.id,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Zodiac signs queries
export async function getAllZodiacSigns() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(zodiacSigns);
}

export async function getZodiacSignById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(zodiacSigns).where(eq(zodiacSigns.id, id)).limit(1);
  return result[0];
}

// Horoscope queries
export async function getTodayHoroscopes() {
  const db = await getDb();
  if (!db) return [];
  const today = new Date().toISOString().split("T")[0];
  return db.select().from(horoscopes).where(eq(horoscopes.date, today));
}

export async function getHoroscopeByZodiacAndDate(zodiacSignId: number, date: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(horoscopes)
    .where(and(eq(horoscopes.zodiacSignId, zodiacSignId), eq(horoscopes.date, date)))
    .limit(1);
  return result[0];
}

export async function createHoroscope(data: typeof horoscopes.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(horoscopes).values(data);
}

// Product queries
export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).orderBy(desc(products.createdAt));
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0];
}

export async function createProduct(data: typeof products.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const now = new Date().toISOString();
  return db.insert(products).values({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateProduct(id: number, data: Partial<typeof products.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(products).where(eq(products.id, id));
}

// Blog post queries
export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result[0];
}

export async function createBlogPost(data: typeof blogPosts.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const now = new Date().toISOString();
  return db.insert(blogPosts).values({
    ...data,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateBlogPost(id: number, data: Partial<typeof blogPosts.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// Video queries
export async function getAllVideos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(videos).orderBy(desc(videos.publishedAt));
}

export async function getVideoById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(videos).where(eq(videos.id, id)).limit(1);
  return result[0];
}

export async function createVideo(data: typeof videos.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const now = new Date().toISOString();
  return db.insert(videos).values({
    ...data,
    publishedAt: now,
    createdAt: now,
  });
}

export async function updateVideo(id: number, data: Partial<typeof videos.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(videos).set(data).where(eq(videos.id, id));
}

export async function deleteVideo(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(videos).where(eq(videos.id, id));
}

// Chat message queries
export async function getUserChatMessages(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.userId, userId))
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit);
}

export async function createChatMessage(data: typeof chatMessages.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(chatMessages).values(data);
}

// User preferences
export async function getUserPreferences(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .limit(1);
  return result[0];
}

export async function updateUserPreferences(
  userId: number,
  data: Partial<typeof userPreferences.$inferInsert>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(userPreferences).set(data).where(eq(userPreferences.userId, userId));
}
