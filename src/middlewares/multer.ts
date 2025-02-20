import multer from "multer";
import { storage } from "../config/Cloudinary";

export const upload = multer({ storage });
