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

export { CreateSupportRequest };
