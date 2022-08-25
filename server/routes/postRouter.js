const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const { body, validationResult } = require("express-validator");
const upload = require("../utils/multer");
const { v2 } = require("../utils/cloudinary");
const fs = require("fs");

//ROUTE 1 : CREATE BLOG = POST(/api/blogs/create)
router.post(
  "/blogs/create",
  upload.single("photo"),
  [
    body("content", "Content cannot be blank").exists(),
    body("title", "Title cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const uploaded = await v2.uploader.upload(req.file.path, {
        public_id: `${req.file.filename}`,
        // folder: images,
      });
      fs.unlinkSync(req.file.path);
      const blog = await Blog.create({
        title: req.body.title,
        photo: { url: uploaded.url, public_id: uploaded.public_id },
        content: req.body.content,
      });
      res.status(200).json(blog);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 2  : FETCHING ALL BLOGS  =  GET(/api/blogs/getall)
router.get("/blogs/getall", async (req, res) => {
  try {
    const allBlogs = await Blog.find().sort("-createdAt");
    res.send(allBlogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 3 : GET BLOG BY ID
router.get("/blogs/getbyid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allBlogs = await Blog.findById(id);
    res.send(allBlogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
