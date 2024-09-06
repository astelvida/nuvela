'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { generateStory } from '@/actions/story.actions';

type Story = {
  title: string;
  chapters: {
    title: string;
    content: string;
  }[];
};

const characterSamples = [
  'A brilliant but eccentric inventor with a mysterious past',
  'A street-smart orphan with a hidden magical ability',
  'A disillusioned detective haunted by an unsolved case',
  'A charismatic rebel leader fighting against an oppressive regime',
  'A time-traveling historian trying to prevent a catastrophic event',
  'A shape-shifting spy on a mission to infiltrate a rival nation',
  'A reluctant hero chosen by an ancient prophecy',
  'An AI gaining sentience and grappling with its newfound emotions',
  'A cursed immortal seeking redemption for past misdeeds',
  'A dimension-hopping merchant dealing in rare and dangerous artifacts',
  'A retired superhero forced back into action by a new threat',
  "A rogue archaeologist racing to uncover an ancient civilization's secrets",
  'A genetically enhanced soldier questioning their loyalty to the program',
  'A interstellar diplomat navigating complex alien cultures to prevent war',
];

export function StoryGenerator() {
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const generatedStory = await generateStory(formData);
      setStory(generatedStory);
    } catch (error) {
      console.error('Failed to generate story:', error);
      // You might want to set an error state here and display it to the user
    } finally {
      setIsLoading(false);
    }
  }

  function handleSampleClick(sample: string) {
    setPrompt(sample);
  }

  return (
    <div className='container mx-auto py-10 px-4'>
      <Card className='w-full max-w-2xl mx-auto mb-8'>
        <CardHeader>
          <CardTitle>AI Story Generator</CardTitle>
          <CardDescription>
            Enter a topic or prompt to generate a unique story with three
            chapters.
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent>
            <Textarea
              name='prompt'
              placeholder='Enter your story topic or prompt here...'
              className='min-h-[100px] mb-4'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className='text-sm text-muted-foreground mb-2'>
              Or try one of these sample prompts:
            </div>
            <div className='flex flex-wrap gap-2'>
              {characterSamples.slice(0, 4).map((sample, index) => (
                <Button
                  key={index}
                  variant='outline'
                  size='sm'
                  onClick={() => handleSampleClick(sample)}
                  type='button'
                >
                  {sample}
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Generating Story...
                </>
              ) : (
                'Generate Story'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {story && (
        <div className='w-full max-w-4xl mx-auto space-y-8'>
          <h1 className='text-4xl font-bold text-center'>{story.title}</h1>
          {story.chapters.map((chapter, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className='text-2xl'>
                  Chapter {index + 1}: {chapter.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='whitespace-pre-wrap'>{chapter.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
