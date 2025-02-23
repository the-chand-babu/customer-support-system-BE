import { Router } from "express";
import {
  getUserProfile,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getAllEmployees,
} from "../../controllers/UserController"; // Ensure alias is correctly configured in tsconfig.json
import { isAuthenticate } from "../../middlewares/auth";
import isAuthorization from "../../middlewares/authorization";

export const userRoutes = Router();

userRoutes.get("/", isAuthenticate, getUsers);
userRoutes.get("/profile/:id", getUserProfile);
userRoutes.patch("/:id", updateUser); // Fixed
userRoutes.delete("/:id", deleteUser); // Fixed
userRoutes.post("/", createUser);
userRoutes.get(
  "/employees",
  isAuthenticate,
  isAuthorization(["Employee", "Admin"]),
  getAllEmployees
);
