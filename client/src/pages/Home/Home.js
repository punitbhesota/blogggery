import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card/Card";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = () => {
    setLoading(true);
    axios
      .get("https://eqaim-api.herokuapp.com/api/blogs/getall")
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className={styles.home}>
      {!loading ? (
        <div className={styles.card_container}>
          {blogs.map((item, idx) => {
            return (
              <Card
                key={idx}
                id={item._id}
                title={item.title}
                content={item.content}
              />
            );
          })}
        </div>
      ) : (
        <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
          loading
        </div>
      )}
      <Link to={"/add"}>
        <img className={styles.addblog} src="./addblog.png" alt="" />
      </Link>
    </div>
  );
};

export default Home;
