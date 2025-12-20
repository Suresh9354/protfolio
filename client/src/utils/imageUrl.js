// src/utils/imageUrl.js

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";

  // If imagePath already has a full URL, return directly
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // BASE_URL should be your backend URL (e.g., https://your-backend.onrender.com)
  // In development, this can be empty if you use the Vite proxy.
  // In production (Vercel), you MUST set VITE_IMAGE_BASE_URL in your Vercel dashboard.
  const BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || "";
  const cleanBase = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;

  // Ensure imagePath starts with a slash
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

  return `${cleanBase}${cleanPath}`;
};

export default getImageUrl;
