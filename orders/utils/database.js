const { Sequelize } = require("sequelize");

const db = new Sequelize({
    host: "localhost",
    port: "5432",
    username: "postgres",
    password: "P@s$123$",
    database: "DB_Orders",
    dialect: "postgres",
});

module.exports = db;