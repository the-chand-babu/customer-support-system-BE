"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.supportSchema = joi_1.default.object({
    userId: joi_1.default.string()
        .required()
        .messages({ "any.required": "User id is required" }),
    productType: joi_1.default.string()
        .required()
        .messages({ "any.required": "Product Type is required" }),
    issueTypes: joi_1.default.array()
        .items(joi_1.default.string())
        .required()
        .messages({ "any.required": "Issue type is required" }),
    issueDescription: joi_1.default.string()
        .required()
        .messages({ "any.required": "Description is required" }),
    policyUpload: joi_1.default.string()
        .required()
        .messages({ "any.required": "Required" }),
    status: joi_1.default.string(),
});
