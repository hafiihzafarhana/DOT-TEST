import { Router } from "express";
import { Routes } from "@interfaces/route.interface";
import { authenticate } from "@/middlewares/authentication.middleware";
import { authorize } from "@/middlewares/authorization.middleware";
import { USER_ID, ADMIN_ID } from "@/utils/constant.util";
import BookController from "./book.controller";

class BookRoute implements Routes {
  public path = "/books";
  public router = Router();
  public bookController = new BookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      `${this.path}`,
      authenticate,
      authorize([USER_ID, ADMIN_ID]),
      this.bookController.findAllBook,
    );

    this.router.get(
      `${this.path}/book`,
      authenticate,
      authorize([USER_ID, ADMIN_ID]),
      this.bookController.findBookByName,
    );

    this.router.get(
      `${this.path}/:id`,
      authenticate,
      authorize([USER_ID, ADMIN_ID]),
      this.bookController.findBookById,
    );

    this.router.post(
      `${this.path}`,
      authenticate,
      authorize(ADMIN_ID),
      this.bookController.addBook,
    );

    this.router.put(
      `${this.path}/:id`,
      authenticate,
      authorize(ADMIN_ID),
      this.bookController.updateBook,
    );

    this.router.delete(
      `${this.path}/:id`,
      authenticate,
      authorize(ADMIN_ID),
      this.bookController.deleteBook,
    );
  }
}

export default BookRoute;
