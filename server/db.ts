import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, zodiacSigns, horoscopes, products, blogPosts, videos, chatMessages, userPreferences } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
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
      values.role = 'admin';
      updateSet.role = 'admin';
    } else {
      // First user becomes admin
      try {
        const existingUsers = await db.select({ id: users.id }).from(users).limit(1);
        if (existingUsers.length === 0) {
          values.role = 'admin';
          updateSet.role = 'admin';
        }
      } catch (err) {
        console.warn("[Database] Could not verify user count, defaulting to user role", err);
      }
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

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
  const today = new Date().toISOString().split('T')[0];
  return db.select().from(horoscopes).where(eq(horoscopes.date, today));
}

export async function getHoroscopeByZodiacAndDate(zodiacSignId: number, date: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(horoscopes)
    .where(and(eq(horoscopes.zodiacSignId, zodiacSignId), eq(horoscopes.date, date)))
    .limit(1);
  return result[0];
}

export async function createHoroscope(data: typeof horoscopes.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  const result = await db.insert(horoscopes).values(data);
  return result;
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
  if (!db) throw new Error('Database not available');
  return db.insert(products).values(data);
}

export async function updateProduct(id: number, data: Partial<typeof products.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
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
  if (!db) throw new Error('Database not available');
  return db.insert(blogPosts).values(data);
}

export async function updateBlogPost(id: number, data: Partial<typeof blogPosts.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
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
  if (!db) throw new Error('Database not available');
  return db.insert(videos).values(data);
}

export async function updateVideo(id: number, data: Partial<typeof videos.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(videos).set(data).where(eq(videos.id, id));
}

export async function deleteVideo(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.delete(videos).where(eq(videos.id, id));
}

// Chat message queries
export async function getUserChatMessages(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatMessages)
    .where(eq(chatMessages.userId, userId))
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit);
}

export async function createChatMessage(data: typeof chatMessages.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(chatMessages).values(data);
}

// User preferences
export async function getUserPreferences(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId)).limit(1);
  return result[0];
}

export async function updateUserPreferences(userId: number, data: Partial<typeof userPreferences.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(userPreferences).set(data).where(eq(userPreferences.userId, userId));
}
