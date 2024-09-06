import { db } from ".";
import * as schema from "./schema";

export const createNewStory = async (newStory) => {
  const story = await db.insert(schema.stories).values({
    userId: "sevdae34",
    title: newStory.title || "New Story",
  });

  console.log(newStory);

  return story;
  // data.chapters.forEach((chapter) => {
  //   db.insert(chapters).values({
  //     ...chapter,
  //     storyId:
  //   });
  // });
};
