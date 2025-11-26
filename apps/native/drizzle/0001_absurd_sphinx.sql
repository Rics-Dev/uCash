ALTER TABLE `accounts` RENAME TO `wallets`;--> statement-breakpoint
ALTER TABLE `wallets` RENAME COLUMN "account_id" TO "wallet_id";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_wallets` (
	`wallet_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`current_balance` real DEFAULT 0 NOT NULL,
	`color` text,
	`icon` text,
	`is_active` integer DEFAULT true,
	`is_net_worth` integer DEFAULT true,
	`bank_name` text,
	`account_number` text,
	`credit_limit` real,
	`billing_cycle_day` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`synced_at` integer,
	`is_deleted` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_wallets`("wallet_id", "user_id", "name", "type", "currency", "current_balance", "color", "icon", "is_active", "is_net_worth", "bank_name", "account_number", "credit_limit", "billing_cycle_day", "created_at", "updated_at", "synced_at", "is_deleted") SELECT "wallet_id", "user_id", "name", "type", "currency", "current_balance", "color", "icon", "is_active", "is_net_worth", "bank_name", "account_number", "credit_limit", "billing_cycle_day", "created_at", "updated_at", "synced_at", "is_deleted" FROM `wallets`;--> statement-breakpoint
DROP TABLE `wallets`;--> statement-breakpoint
ALTER TABLE `__new_wallets` RENAME TO `wallets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `idx_wallets_user` ON `wallets` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_wallets_active` ON `wallets` (`user_id`,`is_active`,`is_deleted`);--> statement-breakpoint
CREATE TABLE `__new_recurring_transactions` (
	`recurrence_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`wallet_id` text NOT NULL,
	`category_id` text,
	`type` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`description` text NOT NULL,
	`notes` text,
	`frequency` text NOT NULL,
	`interval` integer DEFAULT 1,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`next_occurrence` integer NOT NULL,
	`auto_create` integer DEFAULT true,
	`notify_before_days` integer DEFAULT 1,
	`is_active` integer DEFAULT true,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`synced_at` integer,
	`is_deleted` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`wallet_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_recurring_transactions`("recurrence_id", "user_id", "wallet_id", "category_id", "type", "amount", "currency", "description", "notes", "frequency", "interval", "start_date", "end_date", "next_occurrence", "auto_create", "notify_before_days", "is_active", "created_at", "updated_at", "synced_at", "is_deleted") SELECT "recurrence_id", "user_id", "wallet_id", "category_id", "type", "amount", "currency", "description", "notes", "frequency", "interval", "start_date", "end_date", "next_occurrence", "auto_create", "notify_before_days", "is_active", "created_at", "updated_at", "synced_at", "is_deleted" FROM `recurring_transactions`;--> statement-breakpoint
DROP TABLE `recurring_transactions`;--> statement-breakpoint
ALTER TABLE `__new_recurring_transactions` RENAME TO `recurring_transactions`;--> statement-breakpoint
CREATE INDEX `idx_recurring_user` ON `recurring_transactions` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_recurring_next` ON `recurring_transactions` (`next_occurrence`,`is_active`,`is_deleted`);--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`transaction_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`wallet_id` text NOT NULL,
	`category_id` text,
	`type` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`transaction_date` integer NOT NULL,
	`description` text,
	`notes` text,
	`location` text,
	`receipt_path` text,
	`to_wallet_id` text,
	`linked_transaction_id` text,
	`recurrence_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`synced_at` integer,
	`is_deleted` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`wallet_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`to_wallet_id`) REFERENCES `wallets`(`wallet_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("transaction_id", "user_id", "wallet_id", "category_id", "type", "amount", "currency", "transaction_date", "description", "notes", "location", "receipt_path", "to_wallet_id", "linked_transaction_id", "recurrence_id", "created_at", "updated_at", "synced_at", "is_deleted") SELECT "transaction_id", "user_id", "wallet_id", "category_id", "type", "amount", "currency", "transaction_date", "description", "notes", "location", "receipt_path", "to_wallet_id", "linked_transaction_id", "recurrence_id", "created_at", "updated_at", "synced_at", "is_deleted" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;--> statement-breakpoint
CREATE INDEX `idx_transactions_user` ON `transactions` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_transactions_wallet` ON `transactions` (`wallet_id`,`is_deleted`);--> statement-breakpoint
CREATE INDEX `idx_transactions_date` ON `transactions` (`transaction_date`);--> statement-breakpoint
CREATE INDEX `idx_transactions_category` ON `transactions` (`category_id`);--> statement-breakpoint
CREATE INDEX `idx_transactions_user_date` ON `transactions` (`user_id`,`transaction_date`,`is_deleted`);--> statement-breakpoint
CREATE INDEX `idx_transactions_sync` ON `transactions` (`synced_at`,`updated_at`);--> statement-breakpoint
CREATE INDEX `fk_transactions_linked` ON `transactions` (`linked_transaction_id`);--> statement-breakpoint
CREATE TABLE `__new_user_preferences` (
	`user_id` text PRIMARY KEY NOT NULL,
	`default_currency` text DEFAULT 'USD',
	`default_wallet_id` text,
	`theme` text DEFAULT 'system',
	`notification_enabled` integer DEFAULT true,
	`budget_alert_enabled` integer DEFAULT true,
	`weekly_report_enabled` integer DEFAULT false,
	`first_day_of_week` integer DEFAULT 0,
	`date_format` text DEFAULT 'MM/DD/YYYY',
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`default_wallet_id`) REFERENCES `wallets`(`wallet_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_user_preferences`("user_id", "default_currency", "default_wallet_id", "theme", "notification_enabled", "budget_alert_enabled", "weekly_report_enabled", "first_day_of_week", "date_format", "updated_at") SELECT "user_id", "default_currency", "default_wallet_id", "theme", "notification_enabled", "budget_alert_enabled", "weekly_report_enabled", "first_day_of_week", "date_format", "updated_at" FROM `user_preferences`;--> statement-breakpoint
DROP TABLE `user_preferences`;--> statement-breakpoint
ALTER TABLE `__new_user_preferences` RENAME TO `user_preferences`;