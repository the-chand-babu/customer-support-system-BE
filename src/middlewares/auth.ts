import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// ✅ Extend Express Request Interface
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userType?: string;
    }
  }
}

export const isAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void | any => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & { userId?: string; userType?: string };

    if (!decoded.userId || !decoded.userType) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload.",
      });
    }

    // ✅ Assign values to req.body
    req.userId = decoded.userId;
    req.userType = decoded.userType;

    console.log("Updated req.body:", req.body);
    return next(); // ✅ Ensure next() is always called when authentication succeeds
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
