import React, { Component } from "react"
import { Link } from "gatsby"
import styles from "./nav.module.css";

class Nav extends Component {

  constructor(props) {
    super(props);

    let links = [
      { name: 'Home', to: '/' },
      { name: 'About', to: '/about' },
      { name: 'Basics', to: '/basics' },
      { name: 'Books', to: '/books' }
    ];

    this.state = {
      links
    };

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
    let { links } = this.state;
    return (
      <header>
        <div id={styles.logo}>{this.props.siteTitle}</div>
        <p id={styles.motto}>{this.props.siteMotto}</p>
        <div className={styles.rightAlign}>
          {links.map(link =>
            <Link
              key={link.name}
              to={link.to}
              className={styles.link}
              activeClassName={styles.active}
            >
            {link.name}
            </Link>
          ) }
        </div>
      </header>
    )
  }
}

export default Nav
