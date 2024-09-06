// Import necessary modules
import { useState } from "react";
import Image from "next/image";

export default function ImageComponent({ url }) {
  // Set initial state with the original image source
  const [src, setSrc] = useState(url);

  // Function to handle image load errors
  const handleError = () => {
    // Update the state to use a fallback image
    setSrc("/public/placeholder.svg");
  };

  return (
    <Image
      src={src} // Image source from state
      alt="Descriptive alt text"
      width={500}
      height={300}
      onError={handleError} // Call handleError when an error occurs
    />
  );
}
