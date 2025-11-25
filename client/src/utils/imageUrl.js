// src/utils/imageUrl.js

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";

  // If imagePath already has a full URL, return directly
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Build full URL using Vercel ENV variable for Render backend
  const BASE_URL =
    import.meta.env.VITE_IMAGE_BASE_URL || "http://localhost:5000";

  return `${BASE_URL}${imagePath}`;
};

export default getImageUrl;
