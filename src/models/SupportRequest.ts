import mongoose, { Document, Schema } from "mongoose";

interface ISupportRequest extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  productType: "Mobile Phone" | "TV" | "Refrigerator" | "Washing Machine";
  issueTypes: string[];
  issueDescription?: string;
  policyUpload: {
    fileName: string;
    fileType: "pdf" | "doc" | "docx" | "jpg" | "png";
    fileSize: number;
  };
  createdAt: Date;
}

const supportRequestSchema = new Schema<ISupportRequest>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ["pdf", "doc", "docx", "jpg", "png"],
      required: true,
    },
    fileSize: {
      type: Number,
      max: 2 * 1024 * 1024, // 2MB limit
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SupportRequest = mongoose.model<ISupportRequest>(
  "SupportRequest",
  supportRequestSchema
);

export default SupportRequest;
