import { DataTypes, Model, CreationOptional } from "sequelize";

import db from "@config/database";
import User from "./user.model";
import Book from "./book.model";

class BorrowBook extends Model {
  public id: CreationOptional<string>;
  public user_id!: string;
  public book_id!: string;
  public rental_time!: number;
  public status!: string | "BORROWED" | "FINISHED";
  public charged?: number;
  public time_for_rental: string;
  public created_at: string;
}

BorrowBook.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    // waktu sampai kapan sewa
    rental_time: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "BORROWED",
    },
    charged: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    // waktu sewa (DD-MM-YYYY)
    time_for_rental: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "borrow_books",
    sequelize: db.sequelize,
    timestamps: true,
    freezeTableName: true,
  },
);

User.hasMany(BorrowBook, { foreignKey: "user_id" });
Book.hasMany(BorrowBook, { foreignKey: "book_id" });

BorrowBook.belongsTo(User, { foreignKey: "user_id" });
BorrowBook.belongsTo(Book, { foreignKey: "book_id" });

User.belongsToMany(Book, { through: BorrowBook, foreignKey: "user_id" });
Book.belongsToMany(User, { through: BorrowBook, foreignKey: "book_id" });

export default BorrowBook;
