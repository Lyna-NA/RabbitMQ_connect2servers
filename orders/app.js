//modules: require
const express = require("express");
const HttpError = require("./models/HttpError");
const axios = require("axios");
//modules: routes
const userRoutes = require("./routes/user-routes");
const User = require('./models/User')

//require: SequelizeManager
const SequelizeManager = require("./utils/sequelize-manager");
const manager = new SequelizeManager();

//instance: express
const app = express();

//express: use middlewares
//app.use: urlEncoded
//Content-Type: application/x-www-form-url-encoded
app.use(express.urlencoded({ extended: true }));

//express: use middlewares(routes)
app.use("/api/users", userRoutes);

//app.user: Fallback route
app.use("/", (req, res) => {
  throw new HttpError(404, "Not Found");
});

//app.use: Thrown Error Handler
app.use((error, req, res, next) => {
  return res.status(error.code).json({ status: false, message: error.message });
});

//sequelize-manager: Sync & Relations
//sequelize-manager: Authenticate (Connection Check)
manager.authenticate();

//sequelize-manager: Sync (Create tables from models)
manager.syncModels(async (message, status) => {
  if (status) {
    //express: listen
    app.listen(5000);

    // const response = await axios.get('http://localhost:5001/api/users')
    // const users = response.data.data.map(user => ({
    //   id: user.id,
    //   name: user.name,
    //   email: user.email
    // }));
    // console.log("Users from Users Server: ", users);
    
    
    // const existingUserIDs = (await User.findAll({
    //    attributes: ['id']
    // })).map(user => user.id);

    // const newUsers = users.filter(user => {
    //    return !existingUserIDs.includes(user.id);
    // });

    // User.bulkCreate(newUsers)
  }
});


//connect to RabbitMQ
require("./receiver")