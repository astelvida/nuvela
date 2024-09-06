"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mock } from "node:test";
import { Story } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate Story"}
    </Button>
  );
}

interface Chapter {
  title: string;
  content: string;
  image: string;
}

const mockChapters: Chapter[] = [
  {
    title: "Chapter 1: The Mysterious Arrival",
    content:
      "As the sun dipped below the horizon, casting long shadows across the desolate Martian landscape, Dr. Elena Reeves squinted at the blinking lights of her rover's control panel. Something was different tonight. The air, usually thin and lifeless, seemed to vibrate with an otherworldly energy. Suddenly, a brilliant flash illuminated the crimson sky, followed by a thunderous boom that shook the very ground beneath her feet. Heart racing, Elena grabbed her gear and set out to investigate, unaware that this moment would change the course of human history forever.",
    image:
      "https://fmzpxyoqrdbpjmrxhpjr.supabase.co/storage/v1/object/public/images/v0/mars_landscape.png",
  },
  {
    title: "Chapter 2: First Contact",
    content:
      "As Elena approached the impact site, her suit's sensors went haywire. Through the swirling dust, she glimpsed a sleek, metallic object unlike anything she'd ever seen. It pulsed with an eerie blue light, casting strange shadows on the rocky terrain. With trembling hands, she reached out to touch its smooth surface. In that instant, a flood of images and emotions overwhelmed her mind - glimpses of a dying world, a desperate journey across the stars, and a plea for help. Elena stumbled back, gasping for air, as she realized the enormity of what had just occurred: humanity's first contact with an alien intelligence.",
    image:
      "https://fmzpxyoqrdbpjmrxhpjr.supabase.co/storage/v1/object/public/images/v0/alien_artifact.png",
  },
  {
    title: "Chapter 3: A New Dawn",
    content:
      "In the days that followed, Earth buzzed with excitement and fear. As Elena worked tirelessly to decipher the alien messages, world leaders debated the implications of this cosmic encounter. The visitor, they learned, was a sentient probe sent from a distant galaxy, seeking allies in a universe teeming with both wonders and dangers. As humanity grappled with its new role in the cosmic community, Elena couldn't help but feel a sense of hope. Despite the challenges ahead, she knew that this was just the beginning of an extraordinary journey - one that would unite her species and propel them towards a future among the stars.",
    image:
      "https://fmzpxyoqrdbpjmrxhpjr.supabase.co/storage/v1/object/public/images/v0/earth_space.png",
  },
];

export function ToggleStoryView({ story }: { story: Story }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [isCarouselView, setIsCarouselView] = useState(false);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center space-x-4 mb-4">
        <Button
          variant={isCarouselView ? "default" : "outline"}
          onClick={() => setIsCarouselView(true)}>
          Carousel View
        </Button>
        <Button
          variant={!isCarouselView ? "default" : "outline"}
          onClick={() => setIsCarouselView(false)}>
          Scroll View
        </Button>
      </div>

      {!isCarouselView ? (
        <ScrollArea className="h-[600px] w-full max-w-2xl mx-auto rounded-md border p-4">
          <h3>{story.title}</h3>
          {story.chapters.map((chapter, index) => (
            <Card key={index} className="mb-8 last:mb-0">
              <CardContent className="p-4">
                <div className="flex flex-col items-center mb-4">
                  {chapter.image ? (
                    <Image
                      src={chapter.image}
                      alt={`Chapter ${index + 1}`}
                      width={300}
                      height={300}
                      className="rounded-lg mb-4"
                    />
                  ) : (
                    <Skeleton className="w-[300px] h-[300px]" />
                  )}
                  <CardTitle className="text-xl font-semibold">{chapter.title}</CardTitle>
                </div>
                <p className="whitespace-pre-wrap">{chapter.content}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      ) : (
        <div className="relative w-full max-w-2xl mx-auto">
          SOON
          {/* <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              <h3>{story.title}</h3>
              {story.chapters.map((chapter, index) => (
                <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                  <Card className="w-full h-full">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center mb-4">
                        <Image
                          src={chapter.image}
                          alt={`Chapter ${index + 1}`}
                          width={300}
                          height={300}
                          className="rounded-lg mb-4"
                        />
                        <CardTitle className="text-xl font-semibold">{chapter.title}</CardTitle>
                      </div>
                      <p className="whitespace-pre-wrap">{chapter.content}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2"
            onClick={scrollPrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2"
            onClick={scrollNext}>
            <ChevronRight className="h-4 w-4" />
          </Button> */}
        </div>
      )}
    </div>
  );
}
