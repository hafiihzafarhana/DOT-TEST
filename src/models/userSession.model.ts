import { DataTypes, Model, CreationOptional } from "sequelize";
import db from "@config/database";
import User from "@/models/user.model";

class UserSession extends Model {
  public id!: CreationOptional<string>;
  public user_id: string;
  public status!: "ACTIVE" | "EXPIRED";
  public user_agent!: string;
  public access_token!: string;
  public refresh_token!: string;
}

UserSession.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    user_agent: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    access_token: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    refresh_token: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
  },
  {
    tableName: "user_sessions",
    sequelize: db.sequelize,
    timestamps: true,
    freezeTableName: true,
  },
);

User.hasOne(UserSession, {
  sourceKey: "id",
  foreignKey: "user_id",
  as: "user_session_2",
});

UserSession.belongsTo(User, {
  targetKey: "id",
  foreignKey: "user_id",
  as: "user_session_2",
});

export default UserSession;
