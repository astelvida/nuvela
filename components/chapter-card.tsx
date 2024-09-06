'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface CardData {
  title: string;
  content: string;
  image: string;
}

export function ChapterCard({ content, title, image }: CardData) {
  return (
    <Card className='w-[600px] overflow-hidden'>
      <div className='flex'>
        {image ? (
          <Skeleton className='w-[300px] h-[300px]' />
        ) : (
          <div className='relative w-[300px] h-[300px]'>
            <Image
              src={image}
              alt={title}
              fill
              className='object-cover rounded-l-lg'
            />
          </div>
        )}
        <CardHeader className='flex-1 flex items-center'>
          {title ? (
            <Skeleton className='h-8 w-3/4' />
          ) : (
            <CardTitle className='text-2xl mb-2'>{title}</CardTitle>
          )}
        </CardHeader>
      </div>
      <CardContent className='pt-4'>
        {content ? (
          <>
            <Skeleton className='h-4 w-full mb-1' />
            <Skeleton className='h-4 w-5/6 mb-1' />
            <Skeleton className='h-4 w-4/5' />
          </>
        ) : (
          <CardDescription>{content}</CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
