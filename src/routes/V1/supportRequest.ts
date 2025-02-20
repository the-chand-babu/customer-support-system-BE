import { Router } from "express";
import { CreateSupportRequest } from "../../controllers/SupportRequest";
import { upload } from "../../middlewares/multer";
import { isAuthenticate } from "../../middlewares/auth";
import isAuthorization from "../../middlewares/authorization";

export const SupportTicketRoutes = Router();

SupportTicketRoutes.post(
  "/",
  isAuthenticate,
  isAuthorization(["Customer"]),
  upload.single("policyUpload"),
  CreateSupportRequest
);
