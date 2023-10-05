import { Router } from "express";
import AuthController from "@api/auth/auth.controller";
import validationMiddleware from "@middlewares/validation.middleware";
import { Routes } from "@interfaces/route.interface";
import { RegisterUserDto, LoginUserDto, TokenRefresherDto } from "@dtos/auth.dto";
import { authenticate } from "@/middlewares/authentication.middleware";

class AuthRoute implements Routes {
  public path = "/auth";
  public router = Router();
  public AuthController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/signup`,
      validationMiddleware(RegisterUserDto, "body"),
      this.AuthController.register,
    );
    this.router.post(
      `${this.path}/signin`,
      validationMiddleware(LoginUserDto, "body"),
      this.AuthController.login,
    );
    this.router.post(
      `${this.path}/refreshing-access-token`,
      // validationMiddleware(TokenRefresherDto, "body"),
      this.AuthController.tokenRefresh,
    );
    this.router.post(
      `${this.path}/logout`,
      authenticate,
      validationMiddleware(TokenRefresherDto, "body"),
      this.AuthController.logout,
    );
  }
}

export default AuthRoute;
