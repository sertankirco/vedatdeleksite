import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Zodiac signs reference table
export const zodiacSigns = mysqlTable("zodiac_signs", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 64 }).notNull(), // Greek name
  nameEn: varchar("nameEn", { length: 64 }).notNull(), // English name
  nameTr: varchar("nameTr", { length: 64 }).notNull(), // Turkish name
  dates: varchar("dates", { length: 64 }).notNull(),
  icon: varchar("icon", { length: 10 }).notNull(), // Zodiac symbol
});

export type ZodiacSign = typeof zodiacSigns.$inferSelect;

// Daily horoscopes
export const horoscopes = mysqlTable("horoscopes", {
  id: int("id").autoincrement().primaryKey(),
  zodiacSignId: int("zodiac_sign_id").notNull(),
  date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD format
  textEl: text("text_el"), // Greek text
  textEn: text("text_en"), // English text
  textTr: text("text_tr"), // Turkish text
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Horoscope = typeof horoscopes.$inferSelect;

// Chat messages between users and AI
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  language: mysqlEnum("language", ["el", "en", "tr"]).default("el").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;

// Products/Services
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  titleEl: varchar("title_el", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleTr: varchar("title_tr", { length: 255 }).notNull(),
  descriptionEl: text("description_el"),
  descriptionEn: text("description_en"),
  descriptionTr: text("description_tr"),
  price: varchar("price", { length: 64 }).notNull(),
  imageUrl: varchar("image_url", { length: 512 }),
  buyLink: varchar("buy_link", { length: 512 }).notNull(),
  category: varchar("category", { length: 64 }), // e.g., 'natal', 'synastry', 'book'
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Blog posts
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  titleEl: varchar("title_el", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleTr: varchar("title_tr", { length: 255 }).notNull(),
  excerptEl: text("excerpt_el"),
  excerptEn: text("excerpt_en"),
  excerptTr: text("excerpt_tr"),
  contentEl: text("content_el"),
  contentEn: text("content_en"),
  contentTr: text("content_tr"),
  imageUrl: varchar("image_url", { length: 512 }),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Videos
export const videos = mysqlTable("videos", {
  id: int("id").autoincrement().primaryKey(),
  titleEl: varchar("title_el", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleTr: varchar("title_tr", { length: 255 }).notNull(),
  youtubeUrl: varchar("youtube_url", { length: 512 }).notNull(),
  descriptionEl: text("description_el"),
  descriptionEn: text("description_en"),
  descriptionTr: text("description_tr"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Video = typeof videos.$inferSelect;
export type InsertVideo = typeof videos.$inferInsert;

// User preferences
export const userPreferences = mysqlTable("user_preferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().unique(),
  language: mysqlEnum("language", ["el", "en", "tr"]).default("el").notNull(),
  zodiacSignId: int("zodiac_sign_id"),
  theme: mysqlEnum("theme", ["light", "dark"]).default("light").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;