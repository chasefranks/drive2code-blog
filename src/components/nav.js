import React, { Component } from "react"
import { Link } from "gatsby"
import styles from "./nav.module.css";

class Nav extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
      ) {
        document.getElementsByTagName('header')[0].style.padding = "0px 10px";
        document.getElementById(styles.logo).style.fontSize = "20px";
        document.getElementById(styles.logo).style.left="0%";
        document.getElementById(styles.motto).style.left="0%";
        document.getElementById(styles.motto).style.top="6px";
      } else {
        document.getElementsByTagName('header')[0].style.padding = "80px 10px";
        document.getElementById(styles.logo).style.fontSize = "35px";
        document.getElementById(styles.logo).style.left="40%";
        document.getElementById(styles.motto).style.left="30%";
        document.getElementById(styles.motto).style.top="45px";
      }
    }
  }

  render() {
    return (
      <header>
        <div id={styles.logo}>{this.props.siteTitle}</div>
        <p id={styles.motto}>{this.props.siteMotto}</p>
        <div className={styles.rightAlign}>
          <Link
            className={`${styles.active} ${styles.link}`}
            to="/about"
          >
            About
          </Link>
          <Link
            to="/basics"
            className={styles.link}
          >
            Basics
          </Link>
          <Link
            to="/books"
            className={styles.link}
          >
            Books
          </Link>
        </div>
      </header>
    )
  }
}

export default Nav
