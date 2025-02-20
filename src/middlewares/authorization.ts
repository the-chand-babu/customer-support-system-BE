import type { NextFunction, Request, Response } from "express";

const isAuthorization: any = (allowedUserTypes: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (allowedUserTypes.includes(req.userType ?? "")) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Access denied. You do not have the required permissions.",
    });
  };
};

export default isAuthorization;
