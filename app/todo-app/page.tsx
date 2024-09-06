import { getData } from "@/actions/todoActions";
import Todos from "@/components/todo/todos";

export default async function Home() {
  const data = await getData();
  return <Todos todos={data} />;
}
