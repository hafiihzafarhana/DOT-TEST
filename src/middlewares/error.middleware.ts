import { Request, Response, NextFunction } from "express";
import { ErrorInterface } from "@/interfaces/error.interface";
import { apiResponse } from "@/utils/apiResponse.util";
import { StatusCodes } from "http-status-codes";

const errorMiddleware = async (
  error: ErrorInterface,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<unknown, Record<string, unknown>> | undefined> => {
  try {
    // Error untuk handle Sequelize
    console.log(error);
    if (error?.parent?.code) {
      switch (error.parent.code) {
        case "22P02": {
          const message = "Invalid type of data.";
          return res.status(400).json(apiResponse(StatusCodes.BAD_REQUEST, "BAD_REQUEST", message));
        }
        case "42703": {
          const message = "Something went wrong.";
          return res
            .status(500)
            .json(apiResponse(StatusCodes.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", message));
        }
        case "23505": {
          const message = error.parent.detail;
          return res.status(409).json(apiResponse(StatusCodes.CONFLICT, "CONFLICT", message));
        }
      }
    }

    // Error untuk handle JWT
    if (error.name)
      switch (error.name) {
        case "JsonWebTokenError": {
          const message = "Invalid or Expired token. Please login again.";
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(apiResponse(StatusCodes.UNAUTHORIZED, "UNAUTHORIZED", message));
        }
        case "TokenExpiredError": {
          const message = "Invalid or Expired Token. Please login again.";
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(apiResponse(StatusCodes.UNAUTHORIZED, "UNAUTHORIZED", message));
        }
      }

    // Error untuk code 500
    const code = error.code || 500;
    const status = error.status || "INTERNAL_SERVER_ERROR";
    const message = error.message;

    if (code === 500) {
      // await ErrorLog.create({
      //   code,
      //   status,
      //   message,
      // });
      return res.status(code).json(apiResponse(code, status, message));
    }

    return res.status(code).json(apiResponse(code, status, message));
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
