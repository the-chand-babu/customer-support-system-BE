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
exports.getAllEmployees = exports.createUser = exports.updateUser = exports.deleteUser = exports.getUserProfile = exports.getUsers = void 0;
const services_1 = require("../services");
const logger_1 = __importDefault(require("../utils/logger"));
const userServices = new services_1.UserServices();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = yield userServices.getUsers(), { data, status } = _a, rest = __rest(_a, ["data", "status"]);
        return res.status(status).json(Object.assign({ data: data }, rest));
    }
    catch (error) {
        logger_1.default.info(`Error : ${error}`);
        return res
            .status(500)
            .json({ success: false, messages: "Internal Server Error" });
    }
});
exports.getUsers = getUsers;
const getUserProfile = (req, res) => {
    res.send("Fetching user profile");
};
exports.getUserProfile = getUserProfile;
const deleteUser = (req, res) => {
    res.send("Deleting user");
};
exports.deleteUser = deleteUser;
const updateUser = (req, res) => {
    res.send("Updating user");
};
exports.updateUser = updateUser;
const createUser = (req, res) => {
    res.send("Creating user");
};
exports.createUser = createUser;
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = yield userServices.getAllEmployees(), { data, status } = _a, rest = __rest(_a, ["data", "status"]);
        return res.status(status).json(Object.assign({ data: data }, rest));
    }
    catch (error) {
        console.log("error", error);
    }
});
exports.getAllEmployees = getAllEmployees;
