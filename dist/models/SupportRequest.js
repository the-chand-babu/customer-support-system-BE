"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const supportRequestSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users", // Refers to the user who created the ticket
        required: true,
    },
    productType: {
        type: String,
        enum: ["Mobile Phone", "TV", "Refrigerator", "Washing Machine"],
        required: true,
    },
    issueTypes: {
        type: [String],
        required: true,
        validate: {
            validator: function (issueTypes) {
                const validIssues = {
                    "Mobile Phone": [
                        "Broken Screen",
                        "Faulty Camera",
                        "Overheating Issue",
                    ],
                    TV: ["Damaged Screen", "Discoloration Of Screen", "Adapter Issues"],
                    Refrigerator: [
                        "Panel Controls Broken",
                        "Compressor Not Working",
                        "Unable To Turn On",
                    ],
                    "Washing Machine": ["Water Overflowing", "Motor Not Working"],
                };
                return issueTypes.every((issue) => { var _a; return (_a = validIssues[this.productType]) === null || _a === void 0 ? void 0 : _a.includes(issue); });
            },
            message: "Invalid issue type(s) for the selected product type.",
        },
    },
    issueDescription: {
        type: String,
        maxlength: 1000,
    },
    policyUpload: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isAllocated: {
        type: Boolean,
        default: false,
    },
    allocatedEmployee: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users", // Refers to the assigned employee (who is also a User)
        default: null,
    },
    status: {
        type: String, // ✅ Added type
        enum: ["Open", "In Progress", "On Hold", "Completed"],
        default: "Open",
    },
});
const SupportRequest = mongoose_1.default.model("SupportRequest", supportRequestSchema);
exports.default = SupportRequest;
