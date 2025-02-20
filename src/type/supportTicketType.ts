import Joi from "joi";

export const supportSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({ "any.required": "User id is required" }),
  productType: Joi.string()
    .required()
    .messages({ "any.required": "Product Type is required" }),
  issueTypes: Joi.array()
    .items(Joi.string())
    .required()
    .messages({ "any.required": "Issue type is required" }),
  issueDescription: Joi.string()
    .required()
    .messages({ "any.required": "Description is required" }),
  policyUpload: Joi.string()
    .required()
    .messages({ "any.required": "Required" }),
  status: Joi.string(),
});

export interface ISupportRequest {
  userId: string;
  productType: string;
  issueTypes: string[];
  issueDescription: string;
  policyUpload: string;
  isAllocated?: boolean;
  allocatedEmployee?: string;
  status?: string;
}
