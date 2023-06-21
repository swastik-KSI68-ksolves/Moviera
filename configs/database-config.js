const configs = require("./app-configs.js");
const { Sequelize } = require("sequelize");

const sequelizeConfig = new Sequelize({
  username: configs.db.username,
  password: configs.db.password,
  database: configs.db.database,
  host: configs.db.host,
  dialect: "mysql",
  pool: {
    max: parseInt(configs.db.max_pool_connection_limit),
    min: parseInt(configs.db.min_pool_connection_limit),
  },
});

const connectWithDatabase = async () => {
  try {
    await sequelizeConfig.authenticate();
    console.log("DB connection established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
};

module.exports = { sequelizeConfig, connectWithDatabase };
