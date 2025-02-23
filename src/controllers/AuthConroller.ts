import { Request, Response } from "express";
import { UserServices } from "../services";
import logger from "../utils/logger";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userServices = new UserServices();

export const RegisterController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await userServices.createUser(payload);
    const { status, ...responseData } = result;
    return res.status(status).json({ ...responseData });
  } catch (error) {
    logger.info(`Error : ${error}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//login controller....

export const LoginController = async (req: Request, res: Response) => {
  try {
    const { userName, password, userType } = req.body;

    // Fetch user by username
    const result = await userServices.getUserByUserName(userName);
    const { status, success, data, message } = result;

    // If user not found, return error
    if (status !== 200 || !data) {
      return res.status(status).json({ success, message });
    }

    if (data.userType !== userType)
      return res.status(403).json({
        success: false,
        message: "Unauthorized! User type mismatch.",
      });

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, data.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid password!",
      });
    }
    // Create JWT token
    const token = jwt.sign(
      {
        userId: data._id,
        userType: data.userType,
        ...(data.userType === "Employee" && data.isAdmin
          ? { isAdmin: data.isAdmin }
          : {}), // ✅ Correct spread syntax
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "6d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      token,
      role: data.userType,
    });
  } catch (error) {
    logger.error(`Login error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
