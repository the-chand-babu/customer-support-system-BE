"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const AuthConroller_1 = require("../../controllers/AuthConroller");
const express = require("express");
const AuthRoutes = express.Router();
exports.AuthRoutes = AuthRoutes;
AuthRoutes.post("/signup", AuthConroller_1.RegisterController);
AuthRoutes.post("/login", AuthConroller_1.LoginController);
