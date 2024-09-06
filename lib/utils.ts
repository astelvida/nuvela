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
