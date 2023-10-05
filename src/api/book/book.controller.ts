import { UserRoleInterface } from "./../../interfaces/role.interface";
import { Request, Response } from "express";
import { StatusCodes as status } from "http-status-codes";
import expressAsyncHandler from "express-async-handler";
import { apiResponse } from "@/utils/apiResponse.util";
import BookService from "@/services/book.service";

interface AuthenticateRequest extends Request {
  user?: UserRoleInterface;
}

class BookController {
  public bookService = new BookService();

  public findAllBook = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const bookServiceResponse = await this.bookService.findAllBook();
      res.status(status.OK).json(apiResponse(status.OK, "OK", "Get All Book", bookServiceResponse));
    },
  );

  public findBookById = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const book_id = req.params.id;
      const bookServiceResponse = await this.bookService.findBookById(book_id);
      res
        .status(status.OK)
        .json(apiResponse(status.OK, "OK", "Get Book By Id", bookServiceResponse));
    },
  );

  public findBookByName = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const book_name = req.query.name as string;
      console.log(book_name);
      const bookServiceResponse = await this.bookService.findBookByName(book_name);
      res
        .status(status.OK)
        .json(apiResponse(status.OK, "OK", "Get Book By Name", bookServiceResponse));
    },
  );

  public addBook = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const book_data = req.body;
      const bookServiceResponse = await this.bookService.addBook(book_data);
      res
        .status(status.CREATED)
        .json(apiResponse(status.CREATED, "SUCCESS", "Add Book", bookServiceResponse));
    },
  );

  public updateBook = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const book_data = req.body;
      const book_id = req.params.id;
      const bookServiceResponse = await this.bookService.updateBook(book_data, book_id);
      res.status(status.OK).json(apiResponse(status.OK, "OK", "Update Book", bookServiceResponse));
    },
  );

  public deleteBook = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const book_id = req.params.id;
      const bookServiceResponse = await this.bookService.deleteBook(book_id);
      res.status(status.OK).json(apiResponse(status.OK, "OK", "Delete Book", bookServiceResponse));
    },
  );
}

export default BookController;
