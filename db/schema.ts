import { integer, text, boolean, pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});
// /**
//  * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
//  * database instance for multiple projects.
//  *
//  * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
//  */
// export const createTable = pgTableCreator((name) => `nuvela_${name}`);

export const story = pgTable("story", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  ttsUrl: varchar("ttsUrl", { length: 2083 }), // Max URL length
  isFavorite: boolean("isFavorite").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const chapter = pgTable("chapter", {
  id: serial("id").primaryKey(),
  storyId: integer("storyId")
    .notNull()
    .references(() => story.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  imageUrl: varchar("imageUrl", { length: 2083 }).notNull(), // Max URL length
});

// // export const images = createTable("images", {
// //   id: serial("id").primaryKey(),
// //   storyId: uuid("story_id")
// //     .references(() => stories.id)
// //     .notNull(),
// //   title: varchar("title", { length: 255 }).notNull(),
// //   content: text("content").notNull(),
// //   image: varchar("image", { length: 2083 }).notNull(), // Max URL length
// // });
