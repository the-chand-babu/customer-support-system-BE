import { userModal } from "../models";
import logger from "../utils/logger";
import Joi from "joi";
import bcrypt from "bcryptjs";

// Define a Joi schema for validation
const userSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).max(50).required(),
  userType: Joi.string().valid("Customer", "Employee").required(),
  isAdmin: Joi.boolean(),
});

export class UserServices {
  // Register a new user
  async createUser(payload: {
    userName: string;
    password: string;
    userType: string;
  }) {
    try {
      // Validate user input
      const { error } = userSchema.validate(payload);
      if (error) {
        logger.error(`Invalid payload: ${error.details[0].message}`);
        return {
          status: 400,
          success: false,
          message: error.details[0].message,
        };
      }

      // Check if user already exists
      const isUserExist = await userModal.findOne({
        userName: payload.userName,
      });
      if (isUserExist) {
        logger.warn(`User already exists: ${payload.userName}`);
        return { status: 409, success: false, message: "User already exists" };
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      const user = new userModal({
        userName: payload.userName,
        userType: payload.userType,
        password: hashedPassword,
      });

      await user.save();
      logger.info(`User created successfully: ${user.userName}`);

      return {
        status: 201,
        success: true,
        message: "User created successfully",
        data: user,
      };
    } catch (error) {
      logger.error("Error in createUser:", { error });
      return { status: 500, success: false, message: "Internal Server Error" };
    }
  }
  async getUsers() {
    try {
      const users = await userModal.find();
      return { status: 200, success: true, data: users };
    } catch (error) {
      logger.error("Error in getUsers:", { error });
      return { status: 500, success: false, message: "Internal Server Error" };
    }
  }
  async getUserByUserName(userName: string) {
    try {
      const user = await userModal.findOne({ userName });
      if (!user) {
        return { status: 404, success: false, message: "User not found" };
      }
      return { status: 200, success: true, data: user };
    } catch (error) {
      logger.error("Error in getUserByUserName:", { error });
      return { status: 500, success: false, message: "Internal Server Error" };
    }
  }
  async getUserById(id: string) {
    try {
      const user = await userModal.findById(id);
      if (!user) {
        return { status: 404, success: false, message: "User not found" };
      }
      return { status: 200, success: true, data: user };
    } catch (error) {
      logger.error("Error in getUserById:", { error });
      return { status: 500, success: false, message: "Internal Server Error" };
    }
  }

  async updateUser() {}
  async deleteUser() {}
}
