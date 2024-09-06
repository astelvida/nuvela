import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Chapter = {
  title: string;
  content: string;
  image?: string;
};

export type Story = {
  title: string;
  chapters: Chapter[];
};

export const characterSamples = [
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
