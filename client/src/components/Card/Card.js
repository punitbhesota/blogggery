import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ title, id, content }) => {
  return (
    <Link className={styles.card} to={`/blogs/${id}`}>
      <h2>{title}</h2>
      <p
        className={styles.contents}
        dangerouslySetInnerHTML={{ __html: content }}
      ></p>
    </Link>
  );
};

export default Card;
