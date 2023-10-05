import { BorrowBookDto, UpdateBorrowBookDto } from "@/dtos/borrowBook.dto";
import {
  HttpExceptionBadRequest,
  HttpExceptionNotFound,
  HttpExceptionTooManyRequests,
} from "@/exceptions/HttpException";
import BorrowBook from "@/models/borrowBook.model";
import BorrowBookRepository from "@/repositories/borrowBook.repository";
import { isEmpty } from "@/utils/isEmpty.util";
import { addTimeBorrowed, attemptTimeBorrowBook, checkTimeForNow } from "@/utils/moment.util";

class BorrowBookService {
  public borrowBookRepository = new BorrowBookRepository();

  public borrowBook = async (data: BorrowBookDto): Promise<BorrowBookDto | null> => {
    if (isEmpty(data)) throw new HttpExceptionBadRequest("Data Invalid");

    if (data.rental_time < 1)
      throw new HttpExceptionBadRequest("Rental Time Can't Less than 1 Day");

    // check apakah buku telah dipinjam oleh orang lain
    const checkBookWasBorrowed = await this.borrowBookRepository.isBookBorrowedByPerson(
      data.book_id,
    );

    if (checkBookWasBorrowed) throw new HttpExceptionBadRequest("Book was borrowed by other user");

    // check apakah user sudah meminjam buku
    const checkUserWasBorrowedBook = await this.borrowBookRepository.isUserWasBorrowedBook(
      data.user_id,
    );

    if (checkUserWasBorrowedBook) throw new HttpExceptionTooManyRequests("Max borrow: 1");

    // check upaya user sampai 3 kali
    const time_for_rental = attemptTimeBorrowBook();

    const checkAttempt = await this.borrowBookRepository.attemptUserRental(
      data.user_id,
      time_for_rental,
    );

    if (checkAttempt >= 3) throw new HttpExceptionTooManyRequests("Limit Attempt: 3 Books");

    const borrowBook = await this.borrowBookRepository.addBorrowBook(data, time_for_rental);

    return borrowBook;
  };

  public updateBorrowBookByAdmin = async (
    data: UpdateBorrowBookDto,
    borrow_book_id: string,
  ): Promise<BorrowBookDto | null> => {
    if (isEmpty(data) || isEmpty(borrow_book_id)) throw new HttpExceptionBadRequest("Data Invalid");

    // Update hanya untuk waktu rental
    // yang update adalah admin
    const updateBorrowBook = await this.borrowBookRepository.updateBorrowBook(data, borrow_book_id);

    return updateBorrowBook;
  };

  public returnBackBook = async (user_id: string, book_id: string): Promise<BorrowBook | null> => {
    if (isEmpty(user_id) || isEmpty(book_id)) throw new HttpExceptionBadRequest("Data Invalid");

    const returnTheBook = await this.borrowBookRepository.checkUserAndBook(user_id, book_id);

    if (!returnTheBook) throw new HttpExceptionNotFound("Your Data Not Found");

    // kalkulasi charged
    // dapatkan waktu awal menjadi waktu akhir
    const lastTime = addTimeBorrowed(returnTheBook.created_at, returnTheBook.rental_time);
    // dapatkan waktu sekarang
    const dateForNow = checkTimeForNow();

    // pajak
    let chargedData = 0;

    if (new Date(dateForNow) > new Date(lastTime)) {
      chargedData +=
        ((new Date(dateForNow) as unknown as number) - (new Date(lastTime) as unknown as number)) *
        0.01;
    }

    chargedData = Math.floor(chargedData / 1000) * 1000;

    // kembalikan buku
    const backBook = await this.borrowBookRepository.returnBackBook(
      returnTheBook.user_id,
      returnTheBook.book_id,
      chargedData,
    );

    return backBook;
  };

  public historyOfBorrowedBook = async (): Promise<BorrowBook[] | null> => {
    const getHistory = await this.borrowBookRepository.historyOfBorrowedBook();

    return getHistory;
  };

  public getDetailOfTransaction = async (borrow_book_id: string): Promise<BorrowBook | null> => {
    if (isEmpty(borrow_book_id)) throw new HttpExceptionBadRequest("Data Invalid");

    const data = await this.borrowBookRepository.getDetailOfTransaction(borrow_book_id);

    return data;
  };
}

export default BorrowBookService;
