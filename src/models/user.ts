import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true, trim: true },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["Customer", "Employee"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const userModal = mongoose.model("users", userSchema);
