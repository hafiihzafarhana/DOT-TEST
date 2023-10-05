import UserRole from "@/models/userRole.model";
import User from "@/models/user.model";
import { LoginUserDto, RegisterUserDto } from "@/dtos/auth.dto";
import Role from "@/models/role.model";
import BorrowBook from "@/models/borrowBook.model";
import Book from "@/models/book.model";

class UserRepository {
  public findUserByEmailAndDeletedNull = async (
    userData: RegisterUserDto,
  ): Promise<User | null> => {
    return await User.findOne({
      where: { email: userData.email.toLowerCase(), deleted_at: null },
    });
  };

  public findUserByUsernameAndDeletedNull = async (
    userData: RegisterUserDto,
  ): Promise<User | null> => {
    return await User.findOne({
      where: { user_name: userData.username, deleted_at: null },
    });
  };

  public createUser = async (userData): Promise<User> => {
    return await User.create(userData);
  };

  public findUserByEmail = async (userData: LoginUserDto): Promise<User | null> => {
    const data = await User.findOne({
      where: { email: userData.email.toLocaleLowerCase() },
      include: [
        {
          model: UserRole,
          as: "user_role",
        },
      ],
    });
    return data ? data : null;
  };

  public findUserById = async (user_id: string): Promise<User | null> => {
    return await User.findOne({
      where: { id: user_id },
      include: [
        {
          model: UserRole,
          as: "user_role",
          attributes: ["role_id"],
          include: [
            {
              model: Role,
              as: "role",
              attributes: ["role_name"],
            },
          ],
        },
      ],
      attributes: {
        exclude: ["password"],
      },
    });
  };

  public getAllTransactionByUserId = async (user_id: string): Promise<BorrowBook[] | null> => {
    return await BorrowBook.findAll({
      where: {
        user_id,
      },
      attributes: {
        exclude: ["time_for_rental", "user_id"],
      },
      include: [
        {
          model: Book,
          attributes: {
            exclude: ["created_at", "updated_at", "deleted_at", "isbn", "description", "page"],
          },
        },
      ],
    });
  };

  public getDetailTransactionByUser = async (
    user_id: string,
    transactionId: string,
  ): Promise<BorrowBook | null> => {
    return await BorrowBook.findByPk(transactionId, {
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: Book,
          attributes: {
            exclude: ["created_at", "updated_at", "deleted_at"],
          },
        },
      ],
    });
  };
}

export default UserRepository;
