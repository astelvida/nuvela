'use server';

import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const StorySchema = z.object({
  title: z.string(),
  chapters: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
    })
  ),
});

export async function generateStory(formData: FormData) {
  const prompt = formData.get('prompt');

  console.log('Generating story with prompt:', prompt);

  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-2024-08-06',
    response_format: zodResponseFormat(StorySchema, 'story'),
    messages: [
      {
        role: 'system',
        content:
          'You are a creative story writer. Generate a short story based on the given prompt. The story has a title and three chapters, each with a title and content. Each chapter has maximum 200 characters.',
      },
      {
        role: 'user',
        content: `Generate a short story about: ${
          prompt || 'A cyberpunk fever dream'
        } `,
      },
    ],
    max_tokens: 1000,
  });

  const parsedCompletion = completion.choices[0].message.parsed;
  return parsedCompletion;
}
