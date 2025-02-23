"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticate = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded.userId || !decoded.userType) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload.",
            });
        }
        // ✅ Assign values to req.body
        req.userId = decoded.userId;
        req.userType = decoded.userType;
        if (decoded.isAdmin)
            req.isAdmin = decoded.isAdmin;
        return next(); // ✅ Ensure next() is always called when authentication succeeds
    }
    catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
exports.isAuthenticate = isAuthenticate;
