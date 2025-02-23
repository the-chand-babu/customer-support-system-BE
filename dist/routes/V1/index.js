"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Apis = void 0;
const express_session_1 = __importDefault(require("express-session"));
const auth_1 = require("./auth");
const supportRequest_1 = require("./supportRequest");
const user_1 = require("./user");
const v1Apis = function (app) {
    app.use((0, express_session_1.default)({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
    }));
    app.use("/api/v1/auth", auth_1.AuthRoutes);
    app.use("/api/v1/users", user_1.userRoutes);
    app.use("/api/v1/supportRequest", supportRequest_1.SupportTicketRoutes);
};
exports.v1Apis = v1Apis;
