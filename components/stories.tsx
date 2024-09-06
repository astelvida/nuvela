import { deleteStories } from "@/actions/dbActions";
import { Button } from "./ui/button";

export default function Stories({ stories }) {
  return (
    <div>
      <form action={deleteStories}>
        <Button type="submit" variant="destructive">
          Delete All Stories
        </Button>
      </form>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <p> {story.id}</p>
            <p> {story.title}</p>
            <p> {story?.chapter?.length || "NO CHAP"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
