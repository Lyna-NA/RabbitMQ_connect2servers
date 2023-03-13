const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
  },
  name: {
      type: Sequelize.STRING(100),
      allowNull: false,
  },
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
  },
  mobile: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
  }
});
module.exports = User;