import { UserAgentDto } from "@dtos/userAgent.dto";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import AuthService from "@services/auth.service";
import { UserRoleInterface } from "@/interfaces/role.interface";
import { getUserAgent } from "@/utils/userAgent.util";
import { RegisterUserDto, LoginUserDto, TokenRefresherDto } from "@dtos/auth.dto";
import { HttpExceptionUnauthorize } from "@/exceptions/HttpException";
// import { HttpExceptionUnauthorize } from "@/exceptions/HttpException";

interface AuthenticateRequest extends Request {
  user?: UserRoleInterface;
}

class AuthController {
  public authService = new AuthService();

  public register = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userData: RegisterUserDto = req.body;
    const userServiceResponse = await this.authService.register(userData);
    res.status(userServiceResponse.code).json(userServiceResponse);
  });

  public login = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userAgentPayload: UserAgentDto = getUserAgent(req);
    const userData: LoginUserDto = req.body;
    const userServiceResponse = await this.authService.login(userData, userAgentPayload, res);
    res.status(200).json(userServiceResponse);
  });

  public tokenRefresh = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const access_token = req.headers.authorization?.split(" ")[1];
    if (!access_token) {
      throw new HttpExceptionUnauthorize("Unauthorized. Please login to continue.");
    }
    const userServiceResponse = await this.authService.tokenRefresh(access_token);
    res.status(200).json(userServiceResponse);
  });

  public logout = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const { refresh_token } = req.body as TokenRefresherDto;
      const userServiceResponse = await this.authService.logout(refresh_token, res);
      res.status(userServiceResponse.code).json(userServiceResponse);
    },
  );
}

export default AuthController;
