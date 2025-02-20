import { Request, Response } from "express";
import { UserServices } from "../services";
import logger from "../utils/logger";

const userServices = new UserServices();

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const { data, status, ...rest } = await userServices.getUsers();
    return res.status(status).json({ data: data, ...rest });
  } catch (error) {
    logger.info(`Error : ${error}`);
    return res
      .status(500)
      .json({ success: false, messages: "Internal Server Error" });
  }
};

export const getUserProfile = (req: Request, res: Response) => {
  res.send("Fetching user profile");
};

export const deleteUser = (req: Request, res: Response) => {
  res.send("Deleting user");
};

export const updateUser = (req: Request, res: Response) => {
  res.send("Updating user");
};

export const createUser = (req: Request, res: Response) => {
  res.send("Creating user");
};
