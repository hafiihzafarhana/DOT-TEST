import { DataTypes, Model, CreationOptional } from "sequelize";

import db from "@config/database";

class Book extends Model {
  public id: CreationOptional<string>;
  public name!: string;
  public isbn!: string;
  public page!: number;
  public description?: string;
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    isbn: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    page: {
      type: new DataTypes.NUMBER(),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(),
      allowNull: true,
    },
  },
  {
    tableName: "books",
    sequelize: db.sequelize,
    timestamps: true,
    freezeTableName: true,
  },
);

export default Book;
