CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text,
	`completed` text DEFAULT 'false'
);
