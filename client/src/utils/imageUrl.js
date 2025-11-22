// Get the base URL for images
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If imagePath already includes http/https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Otherwise, construct URL from API base URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const baseUrl = API_URL.replace('/api', '');
  return `${baseUrl}${imagePath}`;
};

export default getImageUrl;



