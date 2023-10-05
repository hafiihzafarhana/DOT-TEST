import { BookDto } from "@/dtos/book.dto";
import { HttpExceptionNotFound } from "@/exceptions/HttpException";
import Book from "@/models/book.model";
import { Op } from "sequelize";

class BookRepository {
  public findAllBook = async (): Promise<Book[] | null> => {
    return await Book.findAll();
  };

  public findBookById = async (book_id: string): Promise<Book | null> => {
    return await Book.findByPk(book_id);
  };

  public findBookByName = async (name: string): Promise<Book[] | null> => {
    console.log(name);
    return await Book.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  };

  public addBook = async (data: BookDto): Promise<Book | null> => {
    const adbok = await Book.create({
      name: data.name,
      page: data.page,
      isbn: data.isbn,
      description: data.description,
    });
    return adbok;
  };

  public updateBook = async (data: BookDto, book_id: string): Promise<Book | null> => {
    const existingBook = await Book.findByPk(book_id);
    if (!existingBook) throw new HttpExceptionNotFound("Book not found");

    const updateData = await Book.update(data, {
      where: {
        id: book_id,
      },
      returning: true,
    });

    return updateData[1][0];
  };

  public deleteBook = async (book_id: string): Promise<Book | null> => {
    const existingBook = await Book.findByPk(book_id);
    if (!existingBook) throw new HttpExceptionNotFound("Book not found");

    existingBook.destroy();

    return existingBook;
  };
}

export default BookRepository;
