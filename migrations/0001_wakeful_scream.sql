CREATE TABLE IF NOT EXISTS "todo" (
	"id" integer PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DROP TABLE "nuvela_chapters";--> statement-breakpoint
DROP TABLE "nuvela_stories";