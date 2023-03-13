const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

//The defined model will be transformed to a new CREATE TABLE SQL Query => DDL
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
    }
});
module.exports = User;

/**
 * CREATE TABLE users(
 *   id BIGINT(16) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 *   name VARCHAR(45) NOT NULL
 * )
 */