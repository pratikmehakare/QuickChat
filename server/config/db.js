const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDb = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB Connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = ConnectDb;
