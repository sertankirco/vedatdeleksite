import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  openId: text("openId").unique(),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  loginMethod: text("loginMethod").default("local"),
  role: text("role").default("user").notNull(),
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updatedAt").default("CURRENT_TIMESTAMP").notNull(),
  lastSignedIn: text("lastSignedIn").default("CURRENT_TIMESTAMP").notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Zodiac signs reference table
export const zodiacSigns = sqliteTable("zodiac_signs", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(), // Greek name
  nameEn: text("nameEn").notNull(), // English name
  nameTr: text("nameTr").notNull(), // Turkish name
  dates: text("dates").notNull(),
  icon: text("icon").notNull(), // Zodiac symbol
});

export type ZodiacSign = typeof zodiacSigns.$inferSelect;

// Daily horoscopes
export const horoscopes = sqliteTable("horoscopes", {
  id: integer("id").primaryKey(),
  zodiacSignId: integer("zodiac_sign_id").notNull(),
  date: text("date").notNull(), // YYYY-MM-DD format
  textEl: text("text_el"), // Greek text
  textEn: text("text_en"), // English text
  textTr: text("text_tr"), // Turkish text
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
});

export type Horoscope = typeof horoscopes.$inferSelect;

// Chat messages between users and AI
export const chatMessages = sqliteTable("chat_messages", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  language: text("language").default("el").notNull(),
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;

// Products/Services
export const products = sqliteTable("products", {
  id: integer("id").primaryKey(),
  titleEl: text("title_el").notNull(),
  titleEn: text("title_en").notNull(),
  titleTr: text("title_tr").notNull(),
  descriptionEl: text("description_el"),
  descriptionEn: text("description_en"),
  descriptionTr: text("description_tr"),
  price: text("price").notNull(),
  imageUrl: text("image_url"),
  buyLink: text("buy_link").notNull(),
  category: text("category"), // e.g., 'natal', 'synastry', 'book'
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updatedAt").default("CURRENT_TIMESTAMP").notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Blog posts
export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey(),
  titleEl: text("title_el").notNull(),
  titleEn: text("title_en").notNull(),
  titleTr: text("title_tr").notNull(),
  excerptEl: text("excerpt_el"),
  excerptEn: text("excerpt_en"),
  excerptTr: text("excerpt_tr"),
  contentEl: text("content_el"),
  contentEn: text("content_en"),
  contentTr: text("content_tr"),
  imageUrl: text("image_url"),
  publishedAt: text("published_at").default("CURRENT_TIMESTAMP").notNull(),
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updatedAt").default("CURRENT_TIMESTAMP").notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Videos
export const videos = sqliteTable("videos", {
  id: integer("id").primaryKey(),
  titleEl: text("title_el").notNull(),
  titleEn: text("title_en").notNull(),
  titleTr: text("title_tr").notNull(),
  youtubeUrl: text("youtube_url").notNull(),
  descriptionEl: text("description_el"),
  descriptionEn: text("description_en"),
  descriptionTr: text("description_tr"),
  publishedAt: text("published_at").default("CURRENT_TIMESTAMP").notNull(),
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
});

export type Video = typeof videos.$inferSelect;
export type InsertVideo = typeof videos.$inferInsert;

// User preferences
export const userPreferences = sqliteTable("user_preferences", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  language: text("language").default("el").notNull(),
  zodiacSignId: integer("zodiac_sign_id"),
  theme: text("theme").default("light").notNull(),
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updatedAt").default("CURRENT_TIMESTAMP").notNull(),
});

export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;
