import UserLog from "@/models/userLog.model";
import { Request, Response, NextFunction } from "express";
import { UserRoleInterface } from "@/interfaces/role.interface";
import { getUserLogHeader } from "@/utils/userLogHeader.util";
import { HttpExceptionForbidden } from "@/exceptions/HttpException";
import { userLogHeaderDto } from "@/dtos/userAgent.dto";

interface AuthorizeRequest extends Request {
  user?: UserRoleInterface;
}

const createUserLog = (log: string, method: string) => {
  return async (req: AuthorizeRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      throw new HttpExceptionForbidden("You do not have permission to access this resource");
    } else {
      const data = getUserLogHeader(req) as userLogHeaderDto;

      const newData = {
        user_id: user?.user_id,
        message:
          data.browser + data.ip_address + " " + data.os + " " + data.platform + " " + data.version,
        method,
        log,
      };

      await UserLog.create(newData);

      next();
    }
  };
};

export default createUserLog;
