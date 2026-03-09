import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: text("open_id").unique(),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  loginMethod: text("login_method").default("local"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastSignedIn: timestamp("last_signed_in").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Zodiac signs reference table
export const zodiacSigns = pgTable("zodiac_signs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  nameTr: text("name_tr").notNull(),
  dates: text("dates").notNull(),
  icon: text("icon").notNull(),
});

export type ZodiacSign = typeof zodiacSigns.$inferSelect;

// Daily horoscopes
export const horoscopes = pgTable("horoscopes", {
  id: serial("id").primaryKey(),
  zodiacSignId: integer("zodiac_sign_id").notNull(),
  date: text("date").notNull(),
  textEl: text("text_el"),
  textEn: text("text_en"),
  textTr: text("text_tr"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Horoscope = typeof horoscopes.$inferSelect;

// Chat messages between users and AI
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  language: text("language").default("el").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;

// Products/Services
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  titleEl: text("title_el").notNull(),
  titleEn: text("title_en").notNull(),
  titleTr: text("title_tr").notNull(),
  descriptionEl: text("description_el"),
  descriptionEn: text("description_en"),
  descriptionTr: text("description_tr"),
  price: text("price").notNull(),
  imageUrl: text("image_url"),
  buyLink: text("buy_link").notNull(),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
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
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Videos
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  titleEl: text("title_el").notNull(),
  titleEn: text("title_en").notNull(),
  titleTr: text("title_tr").notNull(),
  youtubeUrl: text("youtube_url").notNull(),
  descriptionEl: text("description_el"),
  descriptionEn: text("description_en"),
  descriptionTr: text("description_tr"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Video = typeof videos.$inferSelect;
export type InsertVideo = typeof videos.$inferInsert;

// User preferences
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  language: text("language").default("el").notNull(),
  zodiacSignId: integer("zodiac_sign_id"),
  theme: text("theme").default("light").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;
