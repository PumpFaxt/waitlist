CREATE TABLE `points_transactions_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user` integer NOT NULL,
	`points` integer NOT NULL,
	`reason` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` integer,
	FOREIGN KEY (`user`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `user_idx` ON `points_transactions_table` (`user`);--> statement-breakpoint
CREATE TABLE `referrals_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`referrer` integer NOT NULL,
	`referred_user` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` integer,
	FOREIGN KEY (`referrer`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`referred_user`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `referrer_idx` ON `referrals_table` (`referrer`);--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`privy_id` text NOT NULL,
	`twitter` text NOT NULL,
	`name` text NOT NULL,
	`avatar_image_url` text,
	`telegram` text,
	`referral_code` text NOT NULL,
	`points` integer DEFAULT 0,
	`referred_by` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` integer,
	FOREIGN KEY (`referred_by`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_referralCode_unique` ON `users_table` (`referral_code`);--> statement-breakpoint
CREATE UNIQUE INDEX `privy_id_idx` ON `users_table` (`privy_id`);