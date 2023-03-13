const User = require("../models/User");
const bcrypt = require("bcrypt");
const {connectToQ} = require("../sender")

exports.index = async (req, res) => {
  let response = await User.findAll();
  res.status(200).json({ status: true, data: response });
};

exports.show = async (req, res) => {
  try {
    let response = await User.findById(req.params.id);
    return res.status(200).json({ status: true, data: response });
  } catch (error) {
    return res
      .status(404)
      .json({ status: false, message: "Document not found!" });
    // throw new HttpError(404, "Document Not Found!");
  }
};

exports.store = async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 12);

  let result = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    mobile: req.body.mobile,
    age: req.body.age,
  });

  res.status(201).json({
    status: true,
    message: "Success",
    data: result,
  });

  const dataToSend = {
    name: result.dataValues.name,
    email: result.dataValues.email,
  };

  console.log(">>>>>>>>>>>>", dataToSend);

  connectToQ(dataToSend).catch(console.error);
};

exports.update = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          age: req.body.age,
        },
      }
    );
    res.status(200).json({ status: true, message: "Success" });
  } catch (error) {
    res.status(422).json({
      status: false,
      message: "Failed, Document not found",
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    let result = await User.destroy({ where: { id: req.params.id } });

    let isDeleted = result == 1;

    return res.status(isDeleted ? 204 : 404).json({
      status: isDeleted,
      message: isDeleted ? "Success" : "Not found",
    });
  } catch (error) {
    res.status(422).json({
      status: false,
      message: "Failed, Document not found",
    });
  }
};
