import { deleteStory } from "@/actions/db.actions";
import { Button } from "./ui/button";

export default function Stories({ stories }) {
  return (
    <div>
      {/* <form action={deleteStory}>
        <Button type="submit" variant="destructive">
          Delete Story
        </Button>
      </form> */}
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
