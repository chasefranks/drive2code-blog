import React, { Component } from "react"
import { Link } from "gatsby"
import styles from "./nav.module.css";

class Nav extends Component {

  constructor(props) {
    super(props);

    // TODO can we get this from GraphQL instead?
    let links = [
      { name: 'Home', to: '/' },
      { name: 'Posts', to: '/posts' },
      { name: 'About', to: '/about' },
      // { name: 'Basics', to: '/basics' },
      // { name: 'Books', to: '/books' }
    ];

    this.state = {
      links,
      size: 'LARGE'
    };

  }

  componentDidMount() {
    window.onscroll = () => {
      if ( document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        this.setState({
          size: 'SMALL'
        })
      } else {
        this.setState({
          size: 'LARGE'
        })
      }
    }
  }

  render() {
    let { links, size } = this.state;
    return (
      <header
        className={size==='LARGE' ? styles.headerLarge : styles.headerSmall}
      >
        <div
          className={size === 'LARGE' ? styles.logoLarge : styles.logoSmall}
        >
          {this.props.siteTitle + (size === 'LARGE' ? '' : '://')}
        </div>
        <p
          className={size === 'LARGE' ? styles.mottoLarge : styles.mottoSmall}
        >
          {this.props.siteMotto}
        </p>
        <nav className={styles.rightAlign}>
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
        </nav>
      </header>
    )
  }
}

export default Nav
