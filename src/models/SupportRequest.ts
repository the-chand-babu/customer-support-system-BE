import mongoose, { Document, Schema } from "mongoose";

interface ISupportRequest extends Document {
  userId: mongoose.Types.ObjectId;
  productType: "Mobile Phone" | "TV" | "Refrigerator" | "Washing Machine";
  issueTypes: string[];
  issueDescription?: string;
  policyUpload?: string;
  createdAt: Date;
  isAllocated: boolean;
  allocatedEmployee: mongoose.Types.ObjectId | null; // References a User (employee)
  status: "Open" | "In Progress" | "On Hold" | "Completed";
}

const supportRequestSchema = new Schema<ISupportRequest>({
  userId: {
    type: Schema.Types.ObjectId,
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
      validator: function (this: ISupportRequest, issueTypes: string[]) {
        const validIssues: Record<string, string[]> = {
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
        return issueTypes.every((issue) =>
          validIssues[this.productType]?.includes(issue)
        );
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
    type: Schema.Types.ObjectId,
    ref: "users", // Refers to the assigned employee (who is also a User)
    default: null,
  },
  status: {
    type: String, // ✅ Added type
    enum: ["Open", "In Progress", "On Hold", "Completed"],
    default: "Open",
  },
});

const SupportRequest = mongoose.model<ISupportRequest>(
  "SupportRequest",
  supportRequestSchema
);

export default SupportRequest;
