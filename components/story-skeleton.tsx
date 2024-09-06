import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function StorySkeleton() {
  return (
    <div className='w-full max-w-4xl mx-auto space-y-8'>
      <Skeleton className='h-12 w-3/4 mx-auto' />
      {[1, 2, 3].map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className='h-8 w-3/4' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-64 w-full mb-4' />
            <Skeleton className='h-4 w-full mb-2' />
            <Skeleton className='h-4 w-full mb-2' />
            <Skeleton className='h-4 w-3/4' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
