import User from "@/models/user.model";
import { isEmpty } from "@/utils/isEmpty.util";
import { HttpExceptionBadRequest, HttpExceptionNotFound } from "@/exceptions/HttpException";

import UserRepository from "@/repositories/user.repository";
import BorrowBook from "@/models/borrowBook.model";

class UserService {
  public userRepository = new UserRepository();

  public findUserById = async (id: string): Promise<User> => {
    if (isEmpty(id)) throw new HttpExceptionBadRequest("Empty id");

    // const data = await User.findByPk(id);
    const data = await this.userRepository.findUserById(id);
    if (!data) {
      throw new HttpExceptionNotFound("User not found");
    }

    return data;
  };

  public getAllTransactionByUserId = async (id: string): Promise<BorrowBook[]> => {
    if (isEmpty(id)) throw new HttpExceptionBadRequest("Empty id");

    // const data = await User.findByPk(id);
    const data = await this.userRepository.getAllTransactionByUserId(id);
    if (!data) {
      throw new HttpExceptionNotFound("User Transaction not found");
    }

    return data;
  };

  public getDetailTransactionByUser = async (
    id: string,
    transactionId: string,
  ): Promise<BorrowBook> => {
    if (isEmpty(id)) throw new HttpExceptionBadRequest("Empty id");

    // const data = await User.findByPk(id);
    const data = await this.userRepository.getDetailTransactionByUser(id, transactionId);
    if (!data) {
      throw new HttpExceptionNotFound("User Transaction not found");
    }

    return data;
  };
}

export default UserService;
