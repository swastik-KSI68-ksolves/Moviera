const { DataTypes } = require("sequelize");
const { sequelizeConfig } = require("../configs/database-config.js");

const MovieModel = sequelizeConfig.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// for creating a sync with DB
MovieModel.sync()
  .then(() => {
    console.log("Movie table created");
  })
  .catch((error) => {
    console.error("Error creating Movie table:", error);
  });

module.exports = MovieModel;
