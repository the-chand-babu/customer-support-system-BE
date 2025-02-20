import Joi from "joi";
import logger from "../utils/logger";
import type { ISupportRequest } from "../type/supportTicketType";
import { supportSchema } from "../type/supportTicketType";
import SupportRequest from "../models/SupportRequest";

export class SupportRequestService {
  /**
   * Create a new support request
   */
  async createSupportRequest(payload: ISupportRequest) {
    try {
      const { error } = supportSchema.validate(payload, { abortEarly: false });
      console.log("this is error", payload.issueTypes);
      if (error) {
        const errorMessages = error.details
          .map((err) => err.message)
          .join(", ");
        logger.error(`Invalid payload: ${errorMessages}`);
        return {
          status: 400,
          success: false,
          message: errorMessages,
        };
      }

      const supportTicket = new SupportRequest(payload);
      await supportTicket.save();
      return {
        status: 201,
        success: true,
        message: "Request successfully generated",
        data: supportTicket,
      };
    } catch (error) {
      logger.error(`Error while creating support request: ${error}`);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  }

  /**
   * Get a support request by ID
   */
  async getSupportRequestById(id: string) {
    try {
      const supportTicket = await SupportRequest.findById(id);
      if (!supportTicket) {
        return {
          status: 404,
          success: false,
          message: "Support request not found",
        };
      }
      return {
        status: 200,
        success: true,
        message: "Support request retrieved successfully",
        data: supportTicket,
      };
    } catch (error) {
      logger.error(`Error while fetching support request: ${error}`);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  }

  /**
   * Update a support request
   */
  async updateSupportRequest(id: string, updateData: Partial<ISupportRequest>) {
    try {
      const updatedTicket = await SupportRequest.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
      if (!updatedTicket) {
        return {
          status: 404,
          success: false,
          message: "Support request not found",
        };
      }
      return {
        status: 200,
        success: true,
        message: "Support request updated successfully",
        data: updatedTicket,
      };
    } catch (error) {
      logger.error(`Error while updating support request: ${error}`);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  }

  /**
   * Delete a support request by ID
   */
  async deleteSupportRequest(id: string) {
    try {
      const isDeleted = await SupportRequest.findByIdAndDelete(id);
      if (!isDeleted) {
        return {
          status: 404,
          success: false,
          message: "Support request not found",
        };
      }
      return {
        status: 200,
        success: true,
        message: "Support request deleted successfully",
      };
    } catch (error) {
      logger.error(`Error while deleting support request: ${error}`);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  }

  /**
   * Get all support requests (with optional pagination)
   */
  async getAllSupportRequests() {
    try {
      const supportTickets = await SupportRequest.find();

      return {
        status: 200,
        success: true,
        message: "Support requests retrieved successfully",
        data: supportTickets,
      };
    } catch (error) {
      logger.error(`Error while fetching support requests: ${error}`);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  }

  /**
   * Assign an employee to a support request
   */
  async assignEmployeeToRequest(ticketId: string, employeeId: string) {
    try {
      const updatedTicket = await SupportRequest.findByIdAndUpdate(
        ticketId,
        { allocatedEmployee: employeeId, isAllocated: true },
        { new: true }
      );

      if (!updatedTicket) {
        return {
          status: 404,
          success: false,
          message: "Support request not found",
        };
      }

      return {
        status: 200,
        success: true,
        message: "Employee assigned successfully",
        data: updatedTicket,
      };
    } catch (error) {
      logger.error(`Error while assigning employee: ${error}`);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  }
}

export default new SupportRequestService();
