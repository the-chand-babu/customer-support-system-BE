"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportTicketRoutes = void 0;
const express_1 = require("express");
const SupportRequest_1 = require("../../controllers/SupportRequest");
const multer_1 = require("../../middlewares/multer");
const auth_1 = require("../../middlewares/auth");
const authorization_1 = __importDefault(require("../../middlewares/authorization"));
exports.SupportTicketRoutes = (0, express_1.Router)();
exports.SupportTicketRoutes.post("/", auth_1.isAuthenticate, (0, authorization_1.default)(["Customer"]), multer_1.upload.single("policyUpload"), SupportRequest_1.CreateSupportRequest);
exports.SupportTicketRoutes.get("/unAllocatedTask", auth_1.isAuthenticate, (0, authorization_1.default)(["Employee", "Admin"]), SupportRequest_1.GetAllUnAllocatedTask);
exports.SupportTicketRoutes.get("/allocatedTask", auth_1.isAuthenticate, (0, authorization_1.default)(["Employee", "Admin"]), SupportRequest_1.GetAllAllocatedTask);
exports.SupportTicketRoutes.patch("/assignedTask/:ticketId", auth_1.isAuthenticate, (0, authorization_1.default)(["Employee", "Admin"]), SupportRequest_1.assignTask);
exports.SupportTicketRoutes.get("/assignedToMe", auth_1.isAuthenticate, (0, authorization_1.default)(["Employee"]), SupportRequest_1.getMyTask);
exports.SupportTicketRoutes.patch("/changeStatus/:ticketId", auth_1.isAuthenticate, (0, authorization_1.default)(["Employee"]), SupportRequest_1.ChangeStatus);
exports.SupportTicketRoutes.get("/my-task", auth_1.isAuthenticate, SupportRequest_1.getMyTickets);
