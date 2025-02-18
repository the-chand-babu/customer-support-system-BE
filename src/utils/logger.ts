import { createLogger, format, transports } from "winston";

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, ...meta }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ""
    }`;
  })
);

// Create logger instance
const logger = createLogger({
  level: "info", // Default logging level
  format: logFormat,
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to a file
    new transports.File({ filename: "logs/combined.log" }), // Log all levels to a combined file
  ],
});

export default logger;
