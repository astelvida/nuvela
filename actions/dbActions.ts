"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as schema from "@/db/schema";
import { db } from "@/db/drizzle";

interface Chapter {
  num: number;
  title: string;
  content: string;
  imageUrl: string;
}

interface Story {
  name: string;
  userId: string;
  chapters: Chapter[];
}

export async function createStory(storyData: Story) {
  // Insert the book
  const { story, chapter } = schema;

  console.log("Creating story:", storyData);
  const [insertedStory] = await db
    .insert(story)
    .values({
      title: storyData.title,
      userId: "sevdix",
    })
    .returning();

  // Insert the chapters
  const chapterInserts = storyData.chapters.map((chapter, index) => ({
    storyId: insertedStory.id,
    num: index + 1,
    title: chapter.title,
    content: chapter.content,
    imageUrl: chapter.image || "",
  }));

  await db.insert(chapter).values(chapterInserts);
  console.dir(insertedStory, { depth: 4 });
  return insertedStory;
}

export const getStories = async () => {
  // const data = await db.select().from(story);
  const result = await db.query.story.findMany({
    with: {
      chapter: true,
    },
  });

  console.log({ result });
  return result;
};

// export const deleteTodo = async (id: number) => {
//   await db.delete(todo).where(eq(todo.id, id));

//   revalidatePath("/");
// };

// export const toggleTodo = async (id: number) => {
//   await db
//     .update(todo)
//     .set({
//       done: not(todo.done),
//     })
//     .where(eq(todo.id, id));

//   revalidatePath("/");
// };

// export const editTodo = async (id: number, text: string) => {
//   await db
//     .update(todo)
//     .set({
//       text: text,
//     })
//     .where(eq(todo.id, id));

//   revalidatePath("/");
// };
