import { Request, Response, NextFunction } from "express";
import { UserRoleInterface } from "@/interfaces/role.interface";
import { HttpExceptionForbidden } from "@/exceptions/HttpException";

interface AuthorizeRequest extends Request {
  user?: UserRoleInterface;
}

export const authorize = (requiredRole) => {
  return (req: AuthorizeRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    // pengondisian untuk role yang diizinkan
    if (!Array.isArray(requiredRole)) {
      if (!user || user?.role_id !== requiredRole)
        throw new HttpExceptionForbidden(
          "You do not have permission to access this resource - string",
        );
    } else if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(req.user?.role_id))
        throw new HttpExceptionForbidden(
          "You do not have permission to access this resource - array",
        );
    }

    next();
  };
};
