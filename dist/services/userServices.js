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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const models_1 = require("../models");
const logger_1 = __importDefault(require("../utils/logger"));
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Define a Joi schema for validation
const userSchema = joi_1.default.object({
    userName: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().min(6).max(50).required(),
    userType: joi_1.default.string().valid("Customer", "Employee").required(),
    isAdmin: joi_1.default.boolean(),
});
class UserServices {
    // Register a new user
    createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate user input
                const { error } = userSchema.validate(payload);
                if (error) {
                    logger_1.default.error(`Invalid payload: ${error.details[0].message}`);
                    return {
                        status: 400,
                        success: false,
                        message: error.details[0].message,
                    };
                }
                // Check if user already exists
                const isUserExist = yield models_1.userModal.findOne({
                    userName: payload.userName,
                });
                if (isUserExist) {
                    logger_1.default.warn(`User already exists: ${payload.userName}`);
                    return { status: 409, success: false, message: "User already exists" };
                }
                // Hash the password before saving
                const hashedPassword = yield bcryptjs_1.default.hash(payload.password, 10);
                const user = new models_1.userModal({
                    userName: payload.userName,
                    userType: payload.userType,
                    password: hashedPassword,
                });
                yield user.save();
                logger_1.default.info(`User created successfully: ${user.userName}`);
                return {
                    status: 201,
                    success: true,
                    message: "User created successfully",
                    data: user,
                };
            }
            catch (error) {
                logger_1.default.error("Error in createUser:", { error });
                return { status: 500, success: false, message: "Internal Server Error" };
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.userModal.find();
                return { status: 200, success: true, data: users };
            }
            catch (error) {
                logger_1.default.error("Error in getUsers:", { error });
                return { status: 500, success: false, message: "Internal Server Error" };
            }
        });
    }
    getUserByUserName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.userModal.findOne({ userName });
                if (!user) {
                    return { status: 404, success: false, message: "User not found" };
                }
                return { status: 200, success: true, data: user };
            }
            catch (error) {
                logger_1.default.error("Error in getUserByUserName:", { error });
                return { status: 500, success: false, message: "Internal Server Error" };
            }
        });
    }
    updateUser() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    deleteUser() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.UserServices = UserServices;
