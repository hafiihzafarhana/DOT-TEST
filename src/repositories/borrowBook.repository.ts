import { BorrowBookDto, UpdateBorrowBookDto } from "@/dtos/borrowBook.dto";
import { HttpExceptionNotFound } from "@/exceptions/HttpException";
import Book from "@/models/book.model";
import BorrowBook from "@/models/borrowBook.model";
import User from "@/models/user.model";

class BorrowBookRepository {
  public addBorrowBook = async (
    data: BorrowBookDto,
    time_for_rental: string,
  ): Promise<BorrowBook | null> => {
    console.log(data);
    return await BorrowBook.create({
      user_id: data.user_id,
      rental_time: data.rental_time,
      book_id: data.book_id,
      time_for_rental,
    });
  };

  // check user kalau sudah meminjam buku
  // hanya boleh meminjam 1 buku saja
  public isUserWasBorrowedBook = async (user_id: string): Promise<boolean> => {
    const data = await BorrowBook.findOne({
      where: {
        user_id,
        status: "BORROWED",
      },
    });

    // jika ada beri true
    return data ? true : false;
  };

  public attemptUserRental = async (user_id: string, time_for_rental: string): Promise<number> => {
    const data = await BorrowBook.count({
      where: {
        user_id,
        time_for_rental,
      },
    });

    return data;
  };

  public isBookBorrowedByPerson = async (book_id: string): Promise<boolean> => {
    const data = await BorrowBook.findOne({
      where: {
        book_id,
        status: "BORROWED",
      },
    });

    // jika ada beri true
    return data ? true : false;
  };

  public updateBorrowBook = async (
    data: UpdateBorrowBookDto,
    borrow_book_id: string,
  ): Promise<BorrowBook | null> => {
    const existingBorrowBook = await BorrowBook.findOne({
      where: {
        id: borrow_book_id,
        status: "BORROWED",
      },
    });
    if (!existingBorrowBook) throw new HttpExceptionNotFound("Book Transaction not found");
    const updateData = await BorrowBook.update(data, {
      where: {
        id: borrow_book_id,
      },
      returning: true,
    });

    return updateData[1][0];
  };

  public checkUserAndBook = async (
    user_id: string,
    book_id: string,
  ): Promise<BorrowBook | null> => {
    const existingBorrowBook = await BorrowBook.findOne({
      where: {
        user_id,
        book_id,
        status: "BORROWED",
      },
      attributes: [
        "id",
        "created_at",
        "book_id",
        "user_id",
        "rental_time",
        "status",
        "charged",
        "time_for_rental",
      ],
    });

    return existingBorrowBook;
  };

  public returnBackBook = async (
    user_id: string,
    book_id: string,
    charged: number,
  ): Promise<BorrowBook> => {
    const getData = await BorrowBook.update(
      {
        status: "FINISHED",
        charged,
      },
      {
        where: {
          user_id,
          book_id,
          status: "BORROWED",
        },
        returning: true,
      },
    );

    return getData[1][0];
  };

  public historyOfBorrowedBook = async (): Promise<BorrowBook[]> => {
    return await BorrowBook.findAll({
      include: [
        {
          model: User,
          attributes: ["email", "name"],
        },
        {
          model: Book,
          attributes: ["name"],
        },
      ],
    });
  };

  public getDetailOfTransaction = async (borrow_book_id: string): Promise<BorrowBook | null> => {
    return await BorrowBook.findByPk(borrow_book_id, {
      include: [
        {
          model: User,
          attributes: ["email", "name"],
        },
        {
          model: Book,
          attributes: ["name"],
        },
      ],
    });
  };
}

export default BorrowBookRepository;
