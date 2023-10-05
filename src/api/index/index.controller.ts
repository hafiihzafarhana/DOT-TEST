import { Request, Response } from "express";
import { apiResponse } from "@/utils/apiResponse.util";
import { StatusCodes as status } from "http-status-codes";

class IndexController {
  public index = (req: Request, res: Response): void => {
    try {
      res.status(status.OK).json(apiResponse(status.OK, "OK", "Welcome"));
    } catch (error) {
      res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(apiResponse(status.INTERNAL_SERVER_ERROR, "INTERNAL SERVER ERROR", error as string));
    }
  };
}

export default IndexController;
