import { Router } from "express";
import {
  getUserProfile,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../../controllers/UserController"; // Ensure alias is correctly configured in tsconfig.json
import { isAuthenticate } from "../../middlewares/auth";

export const userRoutes = Router();

userRoutes.get("/", isAuthenticate, getUsers);
userRoutes.get("/profile/:id", getUserProfile);
userRoutes.patch("/:id", updateUser); // Fixed
userRoutes.delete("/:id", deleteUser); // Fixed
userRoutes.post("/", createUser);
