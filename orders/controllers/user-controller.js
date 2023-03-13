const User = require("../models/User");

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

exports.store = async (userData) => {
  
  if (userData == null) {
    userData = {
      name: userData.name,
      email: userData.email,
    };
  }

  let result = await User.create(userData);

  return({
    status: true,
    message: "Success",
    data: result,
  });
};

exports.update = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
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
    let result = await User.deleteOne({ _id: req.params.id });
    let isDeleted = result.deletedCount == 1;
    res.status(isDeleted ? 204 : 404).json({
      status: isDeleted,
      message: isDeleted ? "Success" : "Not found",
      result: result,
    });
  } catch (error) {
    res.status(422).json({
      status: false,
      message: "Failed, Document not found",
    });
  }
};
