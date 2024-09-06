"use client";

import { Button } from "@/components/ui/button";
import { Save, Mic } from "lucide-react";
import { createUploadedFileUrl } from "@/actions/image.actions";
import { tts } from "@/actions/story.actions";
import mockData from "@/lib/mockdata.json";
import { createNewStory } from "@/db/queries";

export function ActionButtons() {
  const dalleurl =
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-BAl3YpV7pumlbIxLB1lll9Li/user-3GYzta5SGwlZuZnghyMvx5Cc/img-YLxPFIS5u0lxO2KuRxqaXv4v.png?st=2024-09-06T10%3A46%3A06Z&se=2024-09-06T12%3A46%3A06Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-05T22%3A03%3A11Z&ske=2024-09-06T22%3A03%3A11Z&sks=b&skv=2024-08-04&sig=EC8XYD9vrLpPTclrRU/fyprISqGRezgOAN10fc0E9Lo%3D";
  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="grid grid-cols-2 gap-4">
        <form action={() => createNewStory(mockData)}>
          <Button className="w-full" type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Story
          </Button>
        </form>
        {/* <form action={tts}>
          <Button className="w-full" type="submit">
            <Mic className="mr-2 h-4 w-4" />
            Narrate
          </Button>
        </form> */}
      </div>
    </div>
  );
}
