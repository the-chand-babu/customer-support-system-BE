import type { Request, Response } from "express";
import logger from "../utils/logger";
import { SupportRequestService } from "../services";

const supportRequestService = new SupportRequestService();

const CreateSupportRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const payload = req.body;
    let issueTypes;

    issueTypes = JSON.parse(payload.issueTypes);

    const { status, ...result }: any =
      await supportRequestService.createSupportRequest({
        ...payload,
        issueTypes,
        userId: req.userId,
        policyUpload: req.file?.path,
      });
    return res.status(status).json({ ...result });
  } catch (error) {
    logger.error(`Error : ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetAllUnAllocatedTask = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { data, status, ...rest } =
      await supportRequestService.getAllAllocatedOrUnallocatedTask(false);
    return res.status(status).json({ data: data, ...rest });
  } catch (error) {
    logger.info(`Error : ${error}`);
    return res
      .status(500)
      .json({ success: false, messages: "Internal Server Error" });
  }
};

const GetAllAllocatedTask = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { data, status, ...rest } =
      await supportRequestService.getAllAllocatedOrUnallocatedTask(true);

    return res.status(status).json({ data: data, ...rest });
  } catch (error) {
    logger.info(`Error : ${error}`);
    return res
      .status(500)
      .json({ success: false, messages: "Internal Server Error" });
  }
};

const assignTask = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log;
    const { ticketId } = req.params;
    const { employeeId } = req.body;
    const { status, ...result } =
      await supportRequestService.updateSupportRequest(ticketId, {
        isAllocated: true,
        allocatedEmployee: employeeId,
      });
    return res.status(status).json({ ...result });
  } catch (error) {
    logger.info(`Error : ${error}`);
    return res
      .status(500)
      .json({ success: false, messages: "Internal Server Error" });
  }
};

const getMyTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { data, status, ...rest } =
      await supportRequestService.getSupportRequestById(req.userId ?? "");
    return res.status(status).json({ data: data, ...rest });
  } catch (error) {
    logger.info(`Error : ${error}`);
    return res
      .status(500)
      .json({ success: false, messages: "Internal Server Error" });
  }
};

const ChangeStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { ticketId } = req.params;
    const payload = req.body;
    const { status, ...result } =
      await supportRequestService.updateSupportRequest(ticketId, {
        status: payload.status,
      });
    return res.status(status).json({ ...result });
  } catch (error) {
    logger.info(`Error : ${error}`);
    return res
      .status(500)
      .json({ success: false, messages: "Internal Server Error" });
  }
};

const getMyTickets = async (req: Request, res: Response): Promise<any> => {
  try {
    const { data, status, ...rest } = await supportRequestService.getMyTickets(
      req.userId ?? ""
    );
    return res.status(status).json({ data: data, ...rest });
  } catch (error) {
    logger.info(`Error : ${error}`);
    return res
      .status(500)
      .json({ success: false, messages: "Internal Server Error" });
  }
};

export {
  CreateSupportRequest,
  GetAllUnAllocatedTask,
  GetAllAllocatedTask,
  assignTask,
  getMyTask,
  ChangeStatus,
  getMyTickets,
};
