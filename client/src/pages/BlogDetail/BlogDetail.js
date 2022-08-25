import React, { useEffect, useState } from "react";
import styles from "./BlogDetail.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const fetchBlog = () => {
    setLoading(true);
    axios
      .get(`https://eqaim-api.herokuapp.com/api/blogs/getbyid/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className={styles.blogdetail}>
      <Link className={styles.home_button} to="/home">
        <img src="/home2.png" alt="dfdf" />
      </Link>

      <div className={styles.blog}>
        <h1>{blog?.title}</h1>
        <img src={blog?.photo?.url} alt="" />

        <p dangerouslySetInnerHTML={{ __html: blog?.content }}></p>
      </div>
    </div>
  );
};

export default BlogDetail;
