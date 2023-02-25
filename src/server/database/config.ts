const Config = {
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
};

export default Config;
