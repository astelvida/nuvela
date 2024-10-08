export interface Chapter {
  title: string;
  content: string;
  image?: string;
}
export interface Story {
  title: string;
  chapters: Chapter[];
}
