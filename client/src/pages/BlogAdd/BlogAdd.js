import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./BlogAdd.module.css";
import FormData from "form-data";
import axios from "axios";
import Jodit from "../Jodit";

const BlogAdd = () => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [value, setValue] = useState("");
  const getValue = (value) => {
    setValue(value);
  };
  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const addBlog = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("content", value);
    formData.append("photo", fileName);
    setLoading(true);

    if (!title) {
      alert("Title or Content cannot be empty");
    } else {
      axios
        .post("https://eqaim-api.herokuapp.com/api/blogs/create", formData)
        .then((res) => {
          console.log(res);
          setLoading(false);
          setTitle("");
          setContent("");
          alert("blog uploaded");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <div className={styles.blogadd}>
      <div className={styles.buttons}>
        <Link to="/home">
          <img src="./home2.png" alt="" />
        </Link>
        <button form="my-form" type="submit" className={styles.submit}>
          <img src="./post.png" alt="" />
        </button>
      </div>
      {!loading ? (
        <form id="my-form" className={styles.form} onSubmit={addBlog}>
          <input
            className={styles.title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter title"
            // name="title"
          />
          <input
            className={styles.photo}
            type="file"
            filename="photo"
            onChange={onChangeFile}
          />

          <Jodit
            style={{ border: "none" }}
            initialValue=""
            getValue={getValue}
          />
          <textarea
            className={styles.content}
            name="content"
            type="text"
            placeholder="Enter the content"
            value={value}
            readOnly
            style={{ display: "none" }}
          />
        </form>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default BlogAdd;
