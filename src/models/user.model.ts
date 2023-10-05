import { DataTypes, Model, CreationOptional } from "sequelize";
import Role from "@/models/role.model";
import UserRole from "@/models/userRole.model";

import db from "@config/database";

class User extends Model {
  public id: CreationOptional<string>;
  public email!: string;
  public password!: string;
  public name!: string;
  public user_name!: string;
  public user_role: UserRole;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(),
    },
    name: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    user_name: {
      type: new DataTypes.STRING(),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize: db.sequelize,
    timestamps: true,
    freezeTableName: true,
  },
);

User.hasOne(UserRole, { foreignKey: "user_id", as: "user_role" });
UserRole.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});
Role.hasOne(UserRole, {
  foreignKey: "role_id",
  as: "role",
});

User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id" });

export default User;
