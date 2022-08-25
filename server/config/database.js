const mongoose = require("mongoose");

const connectToMongoDB = () => {
  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("DATABASE CONNECTED");
  });
};

module.exports = connectToMongoDB;
