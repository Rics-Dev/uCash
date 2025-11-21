CREATE TABLE `accounts` (
	`account_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`initial_balance` real DEFAULT 0 NOT NULL,
	`current_balance` real DEFAULT 0 NOT NULL,
	`color` text,
	`icon` text,
	`is_active` integer DEFAULT true,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`synced_at` integer,
	`is_deleted` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_accounts_user` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_accounts_active` ON `accounts` (`user_id`,`is_active`,`is_deleted`);--> statement-breakpoint
CREATE TABLE `attachments` (
	`attachment_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`transaction_id` text NOT NULL,
	`file_name` text NOT NULL,
	`file_path` text NOT NULL,
	`file_size` integer,
	`mime_type` text,
	`cloud_url` text,
	`uploaded_at` integer,
	`created_at` integer NOT NULL,
	`is_deleted` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`transaction_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_attachments_transaction` ON `attachments` (`transaction_id`);--> statement-breakpoint
CREATE TABLE `budgets` (
	`budget_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`category_id` text,
	`name` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`period_type` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`rollover` integer DEFAULT false,
	`alert_threshold` real,
	`is_active` integer DEFAULT true,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`synced_at` integer,
	`is_deleted` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_budgets_user` ON `budgets` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_budgets_period` ON `budgets` (`user_id`,`start_date`,`end_date`,`is_deleted`);--> statement-breakpoint
CREATE TABLE `categories` (
	`category_id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`parent_category_id` text,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`color` text,
	`icon` text,
	`is_system` integer DEFAULT false,
	`display_order` integer DEFAULT 0,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`synced_at` integer,
	`is_deleted` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_categories_user` ON `categories` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_categories_type` ON `categories` (`user_id`,`type`,`is_deleted`);--> statement-breakpoint
CREATE INDEX `idx_categories_parent` ON `categories` (`parent_category_id`);--> statement-breakpoint
CREATE INDEX `fk_categories_parent` ON `categories` (`parent_category_id`);--> statement-breakpoint
CREATE TABLE `recurring_transactions` (
	`recurrence_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`account_id` text NOT NULL,
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
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`account_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `idx_recurring_user` ON `recurring_transactions` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_recurring_next` ON `recurring_transactions` (`next_occurrence`,`is_active`,`is_deleted`);--> statement-breakpoint
CREATE TABLE `sync_conflicts` (
	`conflict_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`table_name` text NOT NULL,
	`record_id` text NOT NULL,
	`local_data` text NOT NULL,
	`remote_data` text NOT NULL,
	`resolution` text,
	`created_at` integer NOT NULL,
	`resolved_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sync_log` (
	`sync_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`sync_started_at` integer NOT NULL,
	`sync_completed_at` integer,
	`status` text NOT NULL,
	`records_pushed` integer DEFAULT 0,
	`records_pulled` integer DEFAULT 0,
	`conflicts_resolved` integer DEFAULT 0,
	`error_message` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_sync_user` ON `sync_log` (`user_id`,`sync_started_at`);--> statement-breakpoint
CREATE TABLE `tags` (
	`tag_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`color` text,
	`created_at` integer NOT NULL,
	`is_deleted` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_tags_user` ON `tags` (`user_id`,`is_deleted`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_user_tag` ON `tags` (`user_id`,`name`);--> statement-breakpoint
CREATE TABLE `transaction_tags` (
	`transaction_id` text NOT NULL,
	`tag_id` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`transaction_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`tag_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pk_transaction_tags` ON `transaction_tags` (`transaction_id`,`tag_id`);--> statement-breakpoint
CREATE TABLE `transactions` (
	`transaction_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`account_id` text NOT NULL,
	`category_id` text,
	`type` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`transaction_date` integer NOT NULL,
	`description` text,
	`notes` text,
	`location` text,
	`receipt_path` text,
	`to_account_id` text,
	`linked_transaction_id` text,
	`recurrence_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`synced_at` integer,
	`is_deleted` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`account_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`to_account_id`) REFERENCES `accounts`(`account_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `idx_transactions_user` ON `transactions` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_transactions_account` ON `transactions` (`account_id`,`is_deleted`);--> statement-breakpoint
CREATE INDEX `idx_transactions_date` ON `transactions` (`transaction_date`);--> statement-breakpoint
CREATE INDEX `idx_transactions_category` ON `transactions` (`category_id`);--> statement-breakpoint
CREATE INDEX `idx_transactions_user_date` ON `transactions` (`user_id`,`transaction_date`,`is_deleted`);--> statement-breakpoint
CREATE INDEX `idx_transactions_sync` ON `transactions` (`synced_at`,`updated_at`);--> statement-breakpoint
CREATE INDEX `fk_transactions_linked` ON `transactions` (`linked_transaction_id`);--> statement-breakpoint
CREATE TABLE `user_preferences` (
	`user_id` text PRIMARY KEY NOT NULL,
	`default_currency` text DEFAULT 'USD',
	`default_account_id` text,
	`theme` text DEFAULT 'system',
	`notification_enabled` integer DEFAULT true,
	`budget_alert_enabled` integer DEFAULT true,
	`weekly_report_enabled` integer DEFAULT false,
	`first_day_of_week` integer DEFAULT 0,
	`date_format` text DEFAULT 'MM/DD/YYYY',
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`default_account_id`) REFERENCES `accounts`(`account_id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`last_sync_at` integer,
	`is_premium` integer DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);