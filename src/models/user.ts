import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ["Customer", "Employee"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },

  isAdmin: {
    type: Boolean,
    default: undefined, // Ensures key is absent unless explicitly set
  },
});

// Middleware to handle `isAdmin` logic before saving
userSchema.pre("save", function (next) {
  if (this.userType === "Employee") {
    // If `isAdmin` is explicitly passed, keep its value
    if (this.isAdmin === undefined) {
      this.isAdmin = false; // Default to false if not provided
    }
  } else {
    // Remove `isAdmin` for Customers
    this.isAdmin = undefined;
  }
  next();
});

export const userModal = mongoose.model("users", userSchema);
