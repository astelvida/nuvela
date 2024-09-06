import { useState, useRef, useEffect } from "react";
import { generateNarration } from "../client-api";

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

  const handleNarrate = async (text: string) => {
    setIsNarrating(true);
    try {
      const audioBlob = await generateNarration(text);
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
