/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// JWT secret key (should be in environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-jwt-key";

// Extend the Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        message: "No token provided!",
      });
      return;
    }

    // Check if the header format is correct ("Bearer [token]")
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(401).json({
        message: "Token format is invalid!",
      });
      return;
    }

    const token = parts[1];

    // Verify token
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({
          message: "Unauthorized! Token is invalid or expired.",
        });
        return;
      }

      // Set user data in request object for use in controllers
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };

      next();
    });
  } catch (error) {
    res.status(500).json({
      message: "Error authenticating user",
    });
    return;
  }
};

// Allowed Role
export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!allowedRoles.includes(String(userRole))) {
      res.status(403).json({ message: "Access denied: admin required" });
      return
    }
    next();
  };
};

// Middleware to check if user has admin role
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
      return;
    }

    res.status(403).json({
      message: "Requires admin role!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error checking user role",
    });
  }
};
