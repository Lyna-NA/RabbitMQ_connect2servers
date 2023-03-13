const sequelize = require("./database");

module.exports = class SequelizeManager {
  authenticate() {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connected Successfully");
      })
      .catch((error) => {
        console.log("connection Failed");
      });
  }

  modifyRelations() {
  }

  syncModels(callback) {
    sequelize
      .sync({ force: true })
      .then((result) => {
        // console.log("Tables Created");
        callback("Tables Created!", true);
      })
      .catch((error) => {
        // console.log("Failed to create tables!");
        callback("Failed!", false);
      });
  }
};