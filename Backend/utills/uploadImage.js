// utils/uploadImage.js
export const uploadImage = async (file) => {
    // Mock upload - replace with real cloud storage (e.g., S3, Cloudinary)
    return `/uploads/${file.filename}`;
  };