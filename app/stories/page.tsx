import { getStories } from "@/actions/dbActions";
import Stories from "@/components/stories";

export default async function Home() {
  const data = await getStories();
  return <Stories stories={data} />;
}
