import { NODE_ENV } from "@/utils/constant.util";
import config from "@config/config";
import { Sequelize } from "sequelize";

const dbConfig = config[NODE_ENV] || config["development"];
const sequelize = new Sequelize(
  dbConfig.database as string,
  dbConfig.username as string,
  dbConfig.password,
  dbConfig,
);

sequelize.authenticate();

const db = {
  sequelize,
  Sequelize,
};

export default db;
