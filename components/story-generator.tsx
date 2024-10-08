"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Save, Mic, Volume2, Pause, Play } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { generateStory, generateImagesForChapters } from "@/actions/openai.actions";
import { Loader2 } from "lucide-react";
import { StorySkeleton } from "./story-skeleton";
import { characterSamples, Story } from "@/lib/utils";
import { createStory } from "@/actions/db.actions";
import { ToggleStoryView } from "./story-preview";
import mockData from "@/lib/mockdata.json";
import { useAudioPlayback } from "@/lib/hooks/useAudioPlayback";

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
});

export function StoryGenerator() {
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isNarrating, isPlaying, audioRef, handleNarrate, togglePlayPause } = useAudioPlayback();

  useEffect(() => {
    setStory(mockData);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setStory(null);
    try {
      const formData = new FormData();
      formData.append("prompt", values.prompt);
      const generatedStory = await generateStory(formData);
      setStory(generatedStory);
      setIsLoading(false);

      const chaptersWithImages = await generateImagesForChapters(story);
      setStory((prev) => ({ ...prev, chapters: chaptersWithImages }));
    } catch (error) {
      console.error("Failed to generate story or images:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSampleClick(sample: string) {
    form.setValue("prompt", sample);
  }

  function onNarrate(text: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex-grow flex flex-col md:flex-row">
      <aside className=" w-full md:w-1/2">
        <div className="container mx-auto py-10 px-4">
          <Card className="w-full max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>AI Story Generator</CardTitle>
              <CardDescription>
                Enter a topic or prompt to generate a unique story with three chapters and images.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Story Prompt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your story topic or prompt here..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a brief description or concept for your story.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      Or try one of these sample prompts:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {characterSamples.slice(0, 4).map((sample, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSampleClick(sample)}
                          type="button">
                          {sample}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Story and Images...
                      </>
                    ) : (
                      "Generate Story"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </aside>
      <main className="flex-grow p-4 md:w-1/2">
        {story && !isLoading ? (
          <div className="flex flex-col items-center">
            <ToggleStoryView story={story} />
            <div className="space-y-4 w-full max-w-md">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="w-full"
                  onClick={() => {
                    console.log("|story|", story);
                    createStory(story);
                  }}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Story
                </Button>

                <Button onClick={() => handleNarrate(story)} disabled={isNarrating || isPlaying}>
                  <Volume2 className="mr-2 h-4 w-4" />
                  {isNarrating ? "Narrating..." : "Narrate"}
                </Button>
                {isPlaying && (
                  <Button onClick={togglePlayPause} disabled={isNarrating}>
                    {isPlaying ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Play
                      </>
                    )}
                  </Button>
                )}
              </div>
              <audio ref={audioRef} className="hidden" />
            </div>
          </div>
        ) : (
          <StorySkeleton />
        )}
      </main>
    </div>
  );
}
