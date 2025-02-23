"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthorization = (allowedUserTypes) => {
    return (req, res, next) => {
        var _a;
        if (allowedUserTypes.includes((_a = req.userType) !== null && _a !== void 0 ? _a : "")) {
            if (req.userType === "Employee" &&
                req.isAdmin === true &&
                allowedUserTypes.includes("Admin")) {
                return next();
            }
            else if (req.userType !== "Employee") {
                return next();
            }
            else if (req.userType === "Employee" &&
                !allowedUserTypes.includes("Admin")) {
                return next();
            }
        }
        return res.status(403).json({
            success: false,
            message: "Access denied. You do not have the required permissions.",
        });
    };
};
exports.default = isAuthorization;
