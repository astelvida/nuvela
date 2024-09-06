"use client";

import { Button } from "@/components/ui/button";
import { Save, Mic } from "lucide-react";
import { createUploadedFileUrl } from "@/actions/image.actions";
import { tts } from "@/actions/story.actions";
import mockData from "@/lib/mockdata.json";

export function ActionButtons({ saveStory }) {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="grid grid-cols-2 gap-4">
        <Button className="w-full" onClick={saveStory}>
          <Save className="mr-2 h-4 w-4" />
          Save Story
        </Button>
        <form action={tts}>
          <Button className="w-full" type="submit">
            <Mic className="mr-2 h-4 w-4" />
            Narrate
          </Button>
        </form>
      </div>
    </div>
  );
}
