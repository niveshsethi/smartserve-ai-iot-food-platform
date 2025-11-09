CREATE TABLE `claims` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`donation_id` integer NOT NULL,
	`recipient_id` integer NOT NULL,
	`claimed_at` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	FOREIGN KEY (`donation_id`) REFERENCES `donations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recipient_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `deliveries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`donation_id` integer NOT NULL,
	`claim_id` integer NOT NULL,
	`driver_id` integer NOT NULL,
	`pickup_address` text NOT NULL,
	`delivery_address` text NOT NULL,
	`pickup_time` text,
	`delivery_time` text,
	`distance_km` real,
	`status` text DEFAULT 'pickup_pending' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`donation_id`) REFERENCES `donations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`driver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `donations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`donor_id` integer NOT NULL,
	`food_type` text NOT NULL,
	`title` text NOT NULL,
	`quantity` integer NOT NULL,
	`unit` text NOT NULL,
	`expiry_date` text NOT NULL,
	`pickup_location` text NOT NULL,
	`description` text,
	`image_url` text,
	`ai_category` text,
	`ai_confidence` real,
	`status` text DEFAULT 'available' NOT NULL,
	`is_recurring` integer DEFAULT false,
	`distance` real,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`donor_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `donor_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`total_donations` integer DEFAULT 0,
	`meals_provided` integer DEFAULT 0,
	`active_donations` integer DEFAULT 0,
	`success_rate` real DEFAULT 0,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `logistics_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`active_jobs` integer DEFAULT 0,
	`total_deliveries` integer DEFAULT 0,
	`success_rate` real DEFAULT 0,
	`avg_delivery_time_minutes` integer DEFAULT 0,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`type` text NOT NULL,
	`is_read` integer DEFAULT false,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `partnerships` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`organization_name` text NOT NULL,
	`contact_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`city` text NOT NULL,
	`partnership_type` text NOT NULL,
	`message` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `recipient_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`total_received` integer DEFAULT 0,
	`people_fed` integer DEFAULT 0,
	`active_claims` integer DEFAULT 0,
	`new_alerts` integer DEFAULT 0,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sensor_data` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`delivery_id` integer NOT NULL,
	`ph_level` real,
	`gas_ppm` real,
	`temperature_celsius` real,
	`bio_safety_percent` real,
	`status` text NOT NULL,
	`recorded_at` text NOT NULL,
	FOREIGN KEY (`delivery_id`) REFERENCES `deliveries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text NOT NULL,
	`organization` text,
	`phone` text,
	`location` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);