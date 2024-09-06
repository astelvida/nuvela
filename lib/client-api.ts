export async function generateStory(params: {
  genre: string;
  topic: string;
  mainCharacter: string;
  narrativeStyle: string;
}): Promise<Story> {
  const response = await fetch("/api/generate-story", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Failed to generate story");
  }

  const resp = await response.json();
  console.log("resp", resp);
  return resp;
}

export async function generateNarration(text: string): Promise<Blob> {
  const response = await fetch("/api/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate speech");
  }

  return response.blob();
}
