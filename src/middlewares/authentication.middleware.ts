import { Request, Response, NextFunction } from "express";
import { UserRoleInterface } from "@/interfaces/role.interface";
import expressAsyncHandler from "express-async-handler";
import { verifyAccessToken } from "@/utils/jwt.util";
import { TokenPayload } from "@interfaces/token.interface";
import { HttpExceptionUnauthorize } from "@/exceptions/HttpException";
import UserSession from "@/models/userSession.model";

// implement UserInterface to Request
interface AuthorizeRequest extends Request {
  user?: UserRoleInterface;
}

export const authenticate = expressAsyncHandler(
  async (req: AuthorizeRequest, res: Response, next: NextFunction): Promise<void> => {
    const bearer = req.header("Authorization");
    if (!bearer) {
      throw new HttpExceptionUnauthorize("Authorization header missing");
    }

    // check ada tokennya
    const token = bearer.split(" ")[1];
    if (!token) throw new HttpExceptionUnauthorize("Unauthorized. Please login to continue.");
    const decodedToken: TokenPayload | null = verifyAccessToken(token);

    if (!decodedToken?.session_id) {
      throw new HttpExceptionUnauthorize("Unauthorized. Please login to continue.");
    }

    const user = await UserSession.findOne({
      where: {
        user_id: decodedToken.user_id,
        status: "ACTIVE",
        id: decodedToken.session_id,
      },
    });

    if (!user) {
      throw new HttpExceptionUnauthorize("Unauthorized. Please login to continue.");
    }

    // store ke req.user
    req.user = {
      user_id: decodedToken?.user_id,
      role_id: decodedToken?.role_id,
    } as UserRoleInterface;

    next();
  },
);
