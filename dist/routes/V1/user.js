"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserController_1 = require("../../controllers/UserController"); // Ensure alias is correctly configured in tsconfig.json
const auth_1 = require("../../middlewares/auth");
const authorization_1 = __importDefault(require("../../middlewares/authorization"));
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.get("/", auth_1.isAuthenticate, UserController_1.getUsers);
exports.userRoutes.get("/profile/:id", UserController_1.getUserProfile);
exports.userRoutes.patch("/:id", UserController_1.updateUser); // Fixed
exports.userRoutes.delete("/:id", UserController_1.deleteUser); // Fixed
exports.userRoutes.post("/", UserController_1.createUser);
exports.userRoutes.get("/employees", auth_1.isAuthenticate, (0, authorization_1.default)(["Employee", "Admin"]), UserController_1.getAllEmployees);
