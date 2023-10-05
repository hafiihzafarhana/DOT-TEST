import { Router } from "express";
import { Routes } from "@interfaces/route.interface";
import { authenticate } from "@/middlewares/authentication.middleware";
import { authorize } from "@/middlewares/authorization.middleware";
import { ADMIN_ID, USER_ID } from "@/utils/constant.util";
import BookBorrowController from "./bookBorrow.controller";

class BookBorrowRoute implements Routes {
  public path = "/borrow-books";
  public router = Router();
  public bookBorrowController = new BookBorrowController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      authenticate,
      authorize(USER_ID),
      this.bookBorrowController.borrowBook,
    );

    this.router.get(
      `${this.path}`,
      authenticate,
      authorize(ADMIN_ID),
      this.bookBorrowController.historyOfBorrowedBook,
    );

    this.router.put(
      `${this.path}`,
      authenticate,
      authorize(USER_ID),
      this.bookBorrowController.returnBackBook,
    );

    this.router.put(
      `${this.path}/:id`,
      authenticate,
      authorize(ADMIN_ID),
      this.bookBorrowController.updateBorrowBookByAdmin,
    );

    this.router.get(
      `${this.path}/:id`,
      authenticate,
      authorize(ADMIN_ID),
      this.bookBorrowController.getDetailOfTransaction,
    );
  }
}

export default BookBorrowRoute;
