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
exports.SupportRequestService = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const supportTicketType_1 = require("../type/supportTicketType");
const SupportRequest_1 = __importDefault(require("../models/SupportRequest"));
class SupportRequestService {
    /**
     * Create a new support request
     */
    createSupportRequest(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = supportTicketType_1.supportSchema.validate(payload, { abortEarly: false });
                console.log("this is error", payload.issueTypes);
                if (error) {
                    const errorMessages = error.details
                        .map((err) => err.message)
                        .join(", ");
                    logger_1.default.error(`Invalid payload: ${errorMessages}`);
                    return {
                        status: 400,
                        success: false,
                        message: errorMessages,
                    };
                }
                const supportTicket = new SupportRequest_1.default(payload);
                yield supportTicket.save();
                return {
                    status: 201,
                    success: true,
                    message: "Request successfully generated",
                    data: supportTicket,
                };
            }
            catch (error) {
                logger_1.default.error(`Error while creating support request: ${error}`);
                return {
                    status: 500,
                    success: false,
                    message: "Internal server error",
                };
            }
        });
    }
    /**
     * Get a support request by ID
     */
    getSupportRequestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supportTicket = yield SupportRequest_1.default.find({
                    allocatedEmployee: id,
                });
                if (!supportTicket) {
                    return {
                        status: 404,
                        success: false,
                        message: "Support request not found",
                    };
                }
                return {
                    status: 200,
                    success: true,
                    message: "Support request retrieved successfully",
                    data: supportTicket,
                };
            }
            catch (error) {
                logger_1.default.error(`Error while fetching support request: ${error}`);
                return {
                    status: 500,
                    success: false,
                    message: "Internal server error",
                };
            }
        });
    }
    /**
     * Update a support request
     */
    updateSupportRequest(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTicket = yield SupportRequest_1.default.findByIdAndUpdate(id, updateData, {
                    new: true,
                });
                if (!updatedTicket) {
                    return {
                        status: 404,
                        success: false,
                        message: "Support request not found",
                    };
                }
                return {
                    status: 200,
                    success: true,
                    message: "Support request updated successfully",
                    data: updatedTicket,
                };
            }
            catch (error) {
                logger_1.default.error(`Error while updating support request: ${error}`);
                return {
                    status: 500,
                    success: false,
                    message: "Internal server error",
                };
            }
        });
    }
    /**
     * Delete a support request by ID
     */
    deleteSupportRequest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield SupportRequest_1.default.findByIdAndDelete(id);
                if (!isDeleted) {
                    return {
                        status: 404,
                        success: false,
                        message: "Support request not found",
                    };
                }
                return {
                    status: 200,
                    success: true,
                    message: "Support request deleted successfully",
                };
            }
            catch (error) {
                logger_1.default.error(`Error while deleting support request: ${error}`);
                return {
                    status: 500,
                    success: false,
                    message: "Internal server error",
                };
            }
        });
    }
    /**
     * Get all support requests (with optional pagination)
     */
    getAllSupportRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supportTickets = yield SupportRequest_1.default.find();
                return {
                    status: 200,
                    success: true,
                    message: "Support requests retrieved successfully",
                    data: supportTickets,
                };
            }
            catch (error) {
                logger_1.default.error(`Error while fetching support requests: ${error}`);
                return {
                    status: 500,
                    success: false,
                    message: "Internal server error",
                };
            }
        });
    }
    /**
     * Assign an employee to a support request
     */
    assignEmployeeToRequest(ticketId, employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTicket = yield SupportRequest_1.default.findByIdAndUpdate(ticketId, { allocatedEmployee: employeeId, isAllocated: true }, { new: true });
                if (!updatedTicket) {
                    return {
                        status: 404,
                        success: false,
                        message: "Support request not found",
                    };
                }
                return {
                    status: 200,
                    success: true,
                    message: "Employee assigned successfully",
                    data: updatedTicket,
                };
            }
            catch (error) {
                logger_1.default.error(`Error while assigning employee: ${error}`);
                return {
                    status: 500,
                    success: false,
                    message: "Internal server error",
                };
            }
        });
    }
    //get all unallocated task...
    getAllAllocatedOrUnallocatedTask(isAllocated) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield SupportRequest_1.default.find({ isAllocated: isAllocated });
                return {
                    status: 200,
                    success: true,
                    messages: "All the list of task",
                    data: data,
                };
            }
            catch (error) {
                logger_1.default.info("Error while getting unAllocated Task");
                return {
                    status: 500,
                    success: false,
                    message: "Internal server error",
                };
            }
        });
    }
}
exports.SupportRequestService = SupportRequestService;
exports.default = new SupportRequestService();
