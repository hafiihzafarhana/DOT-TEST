import { UserRoleInterface } from "./../../interfaces/role.interface";
import { Request, Response } from "express";
import { StatusCodes as status } from "http-status-codes";
import expressAsyncHandler from "express-async-handler";
import { apiResponse } from "@/utils/apiResponse.util";
import BorrowBookService from "@/services/borrowBook.service";
import { BorrowBookDto } from "@/dtos/borrowBook.dto";

interface AuthenticateRequest extends Request {
  user?: UserRoleInterface;
}

class BookBorrowController {
  public borrowBookService = new BorrowBookService();

  public borrowBook = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const data: BorrowBookDto = {
        book_id: req.body.book_id,
        rental_time: req.body.rental_time,
        user_id: req.user?.user_id as string,
      };

      const bookServiceResponse = await this.borrowBookService.borrowBook(data);
      res
        .status(status.CREATED)
        .json(
          apiResponse(status.CREATED, "SUCCESS", "You Success Borrow a Book", bookServiceResponse),
        );
    },
  );

  public historyOfBorrowedBook = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const bookServiceResponse = await this.borrowBookService.historyOfBorrowedBook();
      res
        .status(status.OK)
        .json(
          apiResponse(status.OK, "OK", "Success Get History Of Transaction", bookServiceResponse),
        );
    },
  );

  public returnBackBook = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const user_id = req.user?.user_id as string;
      const book_id = req.body.book_id;
      const bookServiceResponse = await this.borrowBookService.returnBackBook(user_id, book_id);
      res
        .status(status.OK)
        .json(apiResponse(status.OK, "OK", "Success Returning Back a Book", bookServiceResponse));
    },
  );

  public updateBorrowBookByAdmin = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const data = req.body;
      const borrow_book_id = req.params.id;
      const bookServiceResponse = await this.borrowBookService.updateBorrowBookByAdmin(
        data,
        borrow_book_id,
      );
      res
        .status(status.OK)
        .json(apiResponse(status.OK, "OK", "Success Returning Back a Book", bookServiceResponse));
    },
  );

  public getDetailOfTransaction = expressAsyncHandler(
    async (req: AuthenticateRequest, res: Response): Promise<void> => {
      const borrow_book_id = req.params.id;
      const bookServiceResponse = await this.borrowBookService.getDetailOfTransaction(
        borrow_book_id,
      );
      res
        .status(status.OK)
        .json(apiResponse(status.OK, "OK", "Success Returning Back a Book", bookServiceResponse));
    },
  );
}

export default BookBorrowController;
