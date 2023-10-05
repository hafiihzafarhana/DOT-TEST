import { Model, DataTypes, CreationOptional } from "sequelize";
import db from "@config/database";

class Role extends Model {
  public id!: CreationOptional<string>;
  public role_name!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    role_name: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    sequelize: db.sequelize,
    timestamps: false,
    freezeTableName: true,
  },
);

export default Role;
