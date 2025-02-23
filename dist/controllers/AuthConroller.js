"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = exports.RegisterController = void 0;
const services_1 = require("../services");
const logger_1 = __importDefault(require("../utils/logger"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userServices = new services_1.UserServices();
const RegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield userServices.createUser(payload);
        const { status } = result, responseData = __rest(result, ["status"]);
        return res.status(status).json(Object.assign({}, responseData));
    }
    catch (error) {
        logger_1.default.info(`Error : ${error}`);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});
exports.RegisterController = RegisterController;
//login controller....
const LoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password, userType } = req.body;
        // Fetch user by username
        const result = yield userServices.getUserByUserName(userName);
        const { status, success, data, message } = result;
        // If user not found, return error
        if (status !== 200 || !data) {
            return res.status(status).json({ success, message });
        }
        if (data.userType !== userType)
            return res.status(403).json({
                success: false,
                message: "Unauthorized! User type mismatch.",
            });
        // Compare passwords
        const isValidPassword = yield bcryptjs_1.default.compare(password, data.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid password!",
            });
        }
        // Create JWT token
        const token = jsonwebtoken_1.default.sign(Object.assign({ userId: data._id, userType: data.userType }, (data.userType === "Employee" && data.isAdmin
            ? { isAdmin: data.isAdmin }
            : {})), process.env.JWT_SECRET, {
            expiresIn: "6d",
        });
        console.log(token);
        return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            token,
        });
    }
    catch (error) {
        logger_1.default.error(`Login error: ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.LoginController = LoginController;
