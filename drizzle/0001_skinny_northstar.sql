CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title_el` varchar(255) NOT NULL,
	`title_en` varchar(255) NOT NULL,
	`title_tr` varchar(255) NOT NULL,
	`excerpt_el` text,
	`excerpt_en` text,
	`excerpt_tr` text,
	`content_el` text,
	`content_en` text,
	`content_tr` text,
	`image_url` varchar(512),
	`published_at` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`language` enum('el','en','tr') NOT NULL DEFAULT 'el',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `horoscopes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`zodiac_sign_id` int NOT NULL,
	`date` varchar(10) NOT NULL,
	`text_el` text,
	`text_en` text,
	`text_tr` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `horoscopes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title_el` varchar(255) NOT NULL,
	`title_en` varchar(255) NOT NULL,
	`title_tr` varchar(255) NOT NULL,
	`description_el` text,
	`description_en` text,
	`description_tr` text,
	`price` varchar(64) NOT NULL,
	`image_url` varchar(512),
	`buy_link` varchar(512) NOT NULL,
	`category` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_preferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`language` enum('el','en','tr') NOT NULL DEFAULT 'el',
	`zodiac_sign_id` int,
	`theme` enum('light','dark') NOT NULL DEFAULT 'light',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_preferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_preferences_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title_el` varchar(255) NOT NULL,
	`title_en` varchar(255) NOT NULL,
	`title_tr` varchar(255) NOT NULL,
	`youtube_url` varchar(512) NOT NULL,
	`description_el` text,
	`description_en` text,
	`description_tr` text,
	`published_at` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `videos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `zodiac_signs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`nameEn` varchar(64) NOT NULL,
	`nameTr` varchar(64) NOT NULL,
	`dates` varchar(64) NOT NULL,
	`icon` varchar(10) NOT NULL,
	CONSTRAINT `zodiac_signs_id` PRIMARY KEY(`id`)
);
