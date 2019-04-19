import React from "react";
import { Link } from "gatsby";
import styles from "./postCard.module.css";

const linkStyle = {
  'textDecoration': 'none',
  color: 'black'
}

const PostCard = ({ link, title, date, icon, excerpt }) =>
  <Link to={link} style={linkStyle} >
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <h2>{title}</h2>
        <h3><em>{date}</em></h3>
      </div>
      <div>
        <p>{excerpt}</p>
      </div>
    </div>
  </Link>

export default PostCard;
