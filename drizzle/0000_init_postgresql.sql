CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"open_id" text,
	"name" text,
	"email" text,
	"password" text,
	"login_method" text DEFAULT 'local',
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_signed_in" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_open_id_unique" UNIQUE("open_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "zodiac_signs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"name_en" text NOT NULL,
	"name_tr" text NOT NULL,
	"dates" text NOT NULL,
	"icon" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "horoscopes" (
	"id" serial PRIMARY KEY NOT NULL,
	"zodiac_sign_id" integer NOT NULL,
	"date" text NOT NULL,
	"text_el" text,
	"text_en" text,
	"text_tr" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"language" text DEFAULT 'el' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_el" text NOT NULL,
	"title_en" text NOT NULL,
	"title_tr" text NOT NULL,
	"description_el" text,
	"description_en" text,
	"description_tr" text,
	"price" text NOT NULL,
	"image_url" text,
	"buy_link" text NOT NULL,
	"category" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_el" text NOT NULL,
	"title_en" text NOT NULL,
	"title_tr" text NOT NULL,
	"excerpt_el" text,
	"excerpt_en" text,
	"excerpt_tr" text,
	"content_el" text,
	"content_en" text,
	"content_tr" text,
	"image_url" text,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_el" text NOT NULL,
	"title_en" text NOT NULL,
	"title_tr" text NOT NULL,
	"youtube_url" text NOT NULL,
	"description_el" text,
	"description_en" text,
	"description_tr" text,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"language" text DEFAULT 'el' NOT NULL,
	"zodiac_sign_id" integer,
	"theme" text DEFAULT 'light' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_preferences_user_id_unique" UNIQUE("user_id")
);
