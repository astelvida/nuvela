export interface Chapter {
  title: string;
  content: string;
  image?: string;
}
export interface Story {
  title: string;
  userId: string;
  chapters: Chapter[];
}
