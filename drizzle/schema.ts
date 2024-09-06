import {
  boolean,
  index,
  pgTable,
  pgTableCreator,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

// import { sql } from '@vercel/postgres';
// export const db = drizzle(sql);

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `nuvela_${name}`);

// export const images = createTable(
//   'image',
//   {
//     id: serial('id').primaryKey(),
//     name: varchar('name', { length: 256 }).notNull(),
//     url: varchar('url', { length: 1024 }).notNull(),
//     userId: varchar('userId', { length: 256 }).notNull(),
//     isFavorite: boolean('isFavorite').default(false),
//     createdAt: timestamp('created_at', { withTimezone: true })
//       .defaultNow()
//       .notNull(),
//     updatedAt: timestamp('updated_at'),
//   },
//   (example) => ({
//     nameIndex: index('name_idx').on(example.name),
//   })
// );

// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

export const ExampleTable = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    image: text('image').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  }
);

// export const getExampleTable = async () => {
//   const selectResult = await db.select().from(ExampleTable);
//   console.log('Results', selectResult);
// };
