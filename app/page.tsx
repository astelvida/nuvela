import { StoryGenerator } from "@/components/story-generator";
import { auth } from "@clerk/nextjs/server";
import { MenuIcon, Settings, Home, User } from "lucide-react";

export default function Page() {
  console.dir(auth(), { depth: 7 });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 bg-primary text-primary-foreground shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">My App</h1>
          <button className="md:hidden">
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </header>
      <StoryGenerator />
    </div>
  );
}
