import { Router } from "express";
import {
  CreateSupportRequest,
  GetAllAllocatedTask,
  GetAllUnAllocatedTask,
  assignTask,
  getMyTask,
  ChangeStatus,
  getMyTickets,
} from "../../controllers/SupportRequest";
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

SupportTicketRoutes.get(
  "/unAllocatedTask",
  isAuthenticate,
  isAuthorization(["Employee", "Admin"]),
  GetAllUnAllocatedTask
);
SupportTicketRoutes.get(
  "/allocatedTask",
  isAuthenticate,
  isAuthorization(["Employee", "Admin"]),
  GetAllAllocatedTask
);

SupportTicketRoutes.patch(
  "/assignedTask/:ticketId",
  isAuthenticate,
  isAuthorization(["Employee", "Admin"]),
  assignTask
);

SupportTicketRoutes.get(
  "/assignedToMe",
  isAuthenticate,
  isAuthorization(["Employee"]),
  getMyTask
);

SupportTicketRoutes.patch(
  "/changeStatus/:ticketId",
  isAuthenticate,
  isAuthorization(["Employee"]),
  ChangeStatus
);

SupportTicketRoutes.get("/my-task", isAuthenticate, getMyTickets);
