import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

export const ImageSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto space-y-8">
    <Skeleton className="h-12 w-3/4 mx-auto" />
    <CardHeader>
      <Skeleton className="h-64 w-full rounded-t-lg" />
    </CardHeader>
  </div>
);

export const ChapterImage = ({ src, alt, width, height }) => (
  <CardHeader className="p-0">
    <img
      className="w-full h-auto object-cover rounded-t-lg"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  </CardHeader>
);

export const ChapterText = ({ title, content }) => (
  <CardContent className="p-6">
    <CardTitle className="text-2xl font-bold mb-4">{title}</CardTitle>
    <p className="text-gray-600">{content}</p>
  </CardContent>
);

export function ChapterCard({ title, content, image }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      {!image ? (
        <ImageSkeleton />
      ) : (
        <ChapterImage src={image} alt={title} width={512} height={512} />
      )}
      <ChapterText title={title} content={content} />
    </Card>
  );
}

export function StoryView({ story }) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">{story.title}</h1>
      {story.chapters.map((chapter, index) => (
        <ChapterCard
          key={index}
          title={`Chapter ${index + 1}: ${chapter.title}`}
          content={chapter.content}
          image={chapter.image}
        />
      ))}
    </div>
  );
}
