import type { NextFunction, Request, Response } from "express";

const isAuthorization: any = (allowedUserTypes: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (allowedUserTypes.includes(req.userType ?? "")) {
      if (
        req.userType === "Employee" &&
        req.isAdmin === true &&
        allowedUserTypes.includes("Admin")
      ) {
        return next();
      } else if (req.userType !== "Employee") {
        return next();
      } else if (
        req.userType === "Employee" &&
        !allowedUserTypes.includes("Admin")
      ) {
        return next();
      }
    }

    return res.status(403).json({
      success: false,
      message: "Access denied. You do not have the required permissions.",
    });
  };
};

export default isAuthorization;
