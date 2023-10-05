import { isEmpty } from "@/utils/isEmpty.util";
import { HttpExceptionBadRequest, HttpExceptionNotFound } from "@/exceptions/HttpException";

import BookRepository from "@/repositories/book.repository";
import Book from "@/models/book.model";
import { BookDto } from "@/dtos/book.dto";

class BookService {
  public bookRepository = new BookRepository();

  public findAllBook = async (): Promise<Book[] | null> => {
    const data = await this.bookRepository.findAllBook();

    return data;
  };

  public findBookById = async (book_id: string): Promise<Book | null> => {
    if (isEmpty(book_id)) throw new HttpExceptionBadRequest("Empty id");
    const data = await this.bookRepository.findBookById(book_id);

    if (!data) {
      throw new HttpExceptionNotFound("Book not found");
    }

    return data;
  };

  public findBookByName = async (name: string): Promise<Book[] | null> => {
    const data = await this.bookRepository.findBookByName(name);

    if (!data) {
      throw new HttpExceptionNotFound("Book not found");
    }

    return data;
  };

  public addBook = async (data: BookDto): Promise<Book | null> => {
    if (isEmpty(data)) throw new HttpExceptionBadRequest("Data Invalid");
    const addBookData = await this.bookRepository.addBook(data);
    return addBookData;
  };

  public updateBook = async (data: BookDto, book_id: string): Promise<Book | null> => {
    if (isEmpty(data) || isEmpty(book_id)) throw new HttpExceptionBadRequest("Data Invalid");
    const BookData = await this.bookRepository.updateBook(data, book_id);
    return BookData;
  };

  public deleteBook = async (book_id: string): Promise<Book | null> => {
    if (isEmpty(book_id)) throw new HttpExceptionBadRequest("Data Invalid");
    const BookData = await this.bookRepository.deleteBook(book_id);
    return BookData;
  };
}

export default BookService;
