import { Sequelize } from "sequelize";
// import Config from "./config";

const sequelize = new Sequelize({
  database: process.env.MYSQL_DB,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    // useUTC: false,
    dateStrings: true,
    typeCast: true,
  },
  timezone: "+05:30",
});

console.log("---- Connection Called ----");
const connection = sequelize;

export default connection;
