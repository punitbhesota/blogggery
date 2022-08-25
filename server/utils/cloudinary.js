// import { v2 as cloudinary } from "cloudinary";
const v2 = require("cloudinary");
v2.config({
  cloud_name: process.env.CLD_NAME,
  api_key: process.env.CLD_KEY,
  api_secret: process.env.CLD_SCRT,
});

module.exports = v2;
