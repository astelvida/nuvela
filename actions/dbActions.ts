"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as schema from "@/db/schema";
import { db } from "@/db/drizzle";

const isAuth = "sevdix";
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
  const stories = await db.query.story.findMany({
    with: {
      chapter: true,
    },
  });
  console.log("number of stories", stories.length);
  return stories;
};

export const getUserStories = async (userId = isAuth) => {
  // const isAuth = ;
  const { story, chapter } = schema;
  const stories = await db.select().from(story).where(eq(story.userId, userId));
  console.log("number of storiess", stories.length);
  return stories;
};

export const deleteStories = async () => {
  const { story } = schema;
  await db.delete(story);
  revalidatePath("/stories");
  console.log("Stories deleted");
};

// deleteStories();

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
