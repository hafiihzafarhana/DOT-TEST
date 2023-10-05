import { Model, DataTypes, CreationOptional } from "sequelize";
import Role from "@/models/role.model";
import User from "@/models/user.model";
import db from "@config/database";

class UserRole extends Model {
  public id!: CreationOptional<string>;
  public user_id!: string;
  public role_id!: string;

  public role: Role;
}

UserRole.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: new DataTypes.STRING(),
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    role_id: {
      type: new DataTypes.STRING(),
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "user_roles",
    sequelize: db.sequelize,
    timestamps: false,
    freezeTableName: true,
  },
);

export default UserRole;
