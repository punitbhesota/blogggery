const multer = require("multer");
const path = require("path");

//storage define for upload posts
const storage = multer.diskStorage({
  //file destination
  destination: function (request, file, callback) {
    callback(null, path.join(path.resolve(), "uploads"));
  },

  //file name
  filename: function (request, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  // limits: {
  //   fieldSize: 1024 * 1024 * 3,
  // },
});
module.exports = upload;
