import { useState, useRef, useEffect } from "react";
import { generateNarration } from "../client-api";

function convertStoryToText(story) {
  // Extract the title of the story
  let text = `Story Title: ${story.title}\n\n`;

  // Iterate through each chapter and add its title and content to the text
  story.chapters.forEach((chapter, index) => {
    text += `Chapter ${index + 1}: ${chapter.title}\n`;
    text += `${chapter.content}\n\n`;
  });

  return text;
}

export function useAudioPlayback() {
  const [isNarrating, setIsNarrating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [audioRef]);

  const handleNarrate = async (story) => {
    setIsNarrating(true);
    try {
      const storyString = convertStoryToText(story);
      const audioBlob = await generateNarration(storyString);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error narrating story:", error);
      alert("An error occurred while narrating the story. Please try again.");
    } finally {
      setIsNarrating(false);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return { isNarrating, isPlaying, audioUrl, audioRef, handleNarrate, togglePlayPause };
}
