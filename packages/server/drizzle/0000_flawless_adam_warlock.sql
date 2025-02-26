CREATE TABLE `points_transactions_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user` integer NOT NULL,
	`points` integer NOT NULL,
	`reason` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` integer,
	FOREIGN KEY (`user`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `referrals_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`referrer` integer NOT NULL,
	`referredUser` integer NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` integer,
	FOREIGN KEY (`referrer`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`referredUser`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `referrer_idx` ON `referrals_table` (`referrer`);--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`privyId` text NOT NULL,
	`twitter` text NOT NULL,
	`telegram` text,
	`referralCode` text NOT NULL,
	`points` integer DEFAULT 0,
	`referredBy` integer,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` integer,
	FOREIGN KEY (`referredBy`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_referralCode_unique` ON `users_table` (`referralCode`);--> statement-breakpoint
CREATE UNIQUE INDEX `privy_id_idx` ON `users_table` (`privyId`);