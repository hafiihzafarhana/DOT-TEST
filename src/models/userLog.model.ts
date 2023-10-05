import User from "@/models/user.model";
import { DataTypes, Model, CreationOptional } from "sequelize";
import db from "@config/database";

class UserLog extends Model {
  public id: CreationOptional<string>;
  public user_id!: CreationOptional<string>;
  public method!: CreationOptional<string>;
  public message!: CreationOptional<string>;
}

UserLog.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    log: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "user_logs",
    sequelize: db.sequelize,
    timestamps: true,
    freezeTableName: true,
  },
);

User.hasMany(UserLog, {
  sourceKey: "id",
  foreignKey: "user_id",
  as: "user_log",
});

UserLog.belongsTo(User, {
  targetKey: "id",
  foreignKey: "user_id",
  as: "user_log",
});

export default UserLog;
