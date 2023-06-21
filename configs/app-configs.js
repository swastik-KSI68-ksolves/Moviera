require("dotenv").config();

const configs = {
  app: {
    port: process.env.APP_PORT,
    app_name: process.env.APP_NAME,
    host: process.env.APP_HOST,
  },
  db: {
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    max_pool_connection_limit: process.env.MAX_DB_POOL_CONNECTION_LIMIT,
    min_pool_connection_limit: process.env.MIN_DB_POOL_CONNECTION_LIMIT,
  },
  log: {
    log_level: process.env.LOG_LEVEL,
  },
};

module.exports = configs;
