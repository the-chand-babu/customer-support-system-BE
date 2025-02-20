import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Configure Multer Storage for Cloudinary
export const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "ticket-file", // Folder name in Cloudinary
    format: file.mimetype.split("/")[1], // Get file format dynamically
    resource_type: "auto", // Automatically detect file type
  }),
});
