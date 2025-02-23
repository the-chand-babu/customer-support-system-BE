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
exports.getMyTickets = exports.ChangeStatus = exports.getMyTask = exports.assignTask = exports.GetAllAllocatedTask = exports.GetAllUnAllocatedTask = exports.CreateSupportRequest = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const services_1 = require("../services");
const supportRequestService = new services_1.SupportRequestService();
const CreateSupportRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const payload = req.body;
        let issueTypes;
        issueTypes = JSON.parse(payload.issueTypes);
        const _b = yield supportRequestService.createSupportRequest(Object.assign(Object.assign({}, payload), { issueTypes, userId: req.userId, policyUpload: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path })), { status } = _b, result = __rest(_b, ["status"]);
        return res.status(status).json(Object.assign({}, result));
    }
    catch (error) {
        logger_1.default.error(`Error : ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.CreateSupportRequest = CreateSupportRequest;
const GetAllUnAllocatedTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = yield supportRequestService.getAllAllocatedOrUnallocatedTask(false), { data, status } = _a, rest = __rest(_a, ["data", "status"]);
        return res.status(status).json(Object.assign({ data: data }, rest));
    }
    catch (error) {
        logger_1.default.info(`Error : ${error}`);
        return res
            .status(500)
            .json({ success: false, messages: "Internal Server Error" });
    }
});
exports.GetAllUnAllocatedTask = GetAllUnAllocatedTask;
const GetAllAllocatedTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = yield supportRequestService.getAllAllocatedOrUnallocatedTask(true), { data, status } = _a, rest = __rest(_a, ["data", "status"]);
        return res.status(status).json(Object.assign({ data: data }, rest));
    }
    catch (error) {
        logger_1.default.info(`Error : ${error}`);
        return res
            .status(500)
            .json({ success: false, messages: "Internal Server Error" });
    }
});
exports.GetAllAllocatedTask = GetAllAllocatedTask;
const assignTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log;
        const { ticketId } = req.params;
        const { employeeId } = req.body;
        const _a = yield supportRequestService.updateSupportRequest(ticketId, {
            isAllocated: true,
            allocatedEmployee: employeeId,
        }), { status } = _a, result = __rest(_a, ["status"]);
        return res.status(status).json(Object.assign({}, result));
    }
    catch (error) {
        logger_1.default.info(`Error : ${error}`);
        return res
            .status(500)
            .json({ success: false, messages: "Internal Server Error" });
    }
});
exports.assignTask = assignTask;
const getMyTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _b = yield supportRequestService.getSupportRequestById((_a = req.userId) !== null && _a !== void 0 ? _a : ""), { data, status } = _b, rest = __rest(_b, ["data", "status"]);
        return res.status(status).json(Object.assign({ data: data }, rest));
    }
    catch (error) {
        logger_1.default.info(`Error : ${error}`);
        return res
            .status(500)
            .json({ success: false, messages: "Internal Server Error" });
    }
});
exports.getMyTask = getMyTask;
const ChangeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const payload = req.body;
        const _a = yield supportRequestService.updateSupportRequest(ticketId, {
            status: payload.status,
        }), { status } = _a, result = __rest(_a, ["status"]);
        return res.status(status).json(Object.assign({}, result));
    }
    catch (error) {
        logger_1.default.info(`Error : ${error}`);
        return res
            .status(500)
            .json({ success: false, messages: "Internal Server Error" });
    }
});
exports.ChangeStatus = ChangeStatus;
const getMyTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _b = yield supportRequestService.getMyTickets((_a = req.userId) !== null && _a !== void 0 ? _a : ""), { data, status } = _b, rest = __rest(_b, ["data", "status"]);
        return res.status(status).json(Object.assign({ data: data }, rest));
    }
    catch (error) {
        logger_1.default.info(`Error : ${error}`);
        return res
            .status(500)
            .json({ success: false, messages: "Internal Server Error" });
    }
});
exports.getMyTickets = getMyTickets;
