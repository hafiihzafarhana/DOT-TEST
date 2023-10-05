import { Router } from "express";
import { Routes } from "@interfaces/route.interface";
import { authenticate } from "@/middlewares/authentication.middleware";
import UserController from "@/api/user/user.controller";
import { authorize } from "@/middlewares/authorization.middleware";
import { USER_ID } from "@/utils/constant.util";

class UserRoute implements Routes {
  public path = "/user-profiles";
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/me`, authenticate, authorize(USER_ID), this.userController.getMe);
    this.router.get(
      `${this.path}/my-transactions`,
      authenticate,
      authorize(USER_ID),
      this.userController.getAllTransactionByUserId,
    );
    this.router.get(
      `${this.path}/my-transactions/:id`,
      authenticate,
      authorize(USER_ID),
      this.userController.getDetailTransactionByUser,
    );
  }
}

export default UserRoute;
