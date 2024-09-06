CREATE TABLE IF NOT EXISTS "chapter" (
	"id" serial PRIMARY KEY NOT NULL,
	"storyId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"imageUrl" varchar(2083) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "story" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"userId" varchar(255) NOT NULL,
	"ttsUrl" varchar(2083),
	"isFavorite" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chapter" ADD CONSTRAINT "chapter_storyId_story_id_fk" FOREIGN KEY ("storyId") REFERENCES "public"."story"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
