import React, { Component } from "react"
import { Link } from "gatsby"
import FontAwesome from "react-fontawesome"
import classnames from "classnames"

import styles from "./nav.module.css";

class Nav extends Component {

  constructor(props) {
    super(props);

    // TODO can we get this from GraphQL instead?
    // TODO in any event, pass them as props
    let links = [
      { name: 'Home', to: '/' },
      { name: 'Posts', to: '/posts' },
      { name: 'About', to: '/about' },
      // { name: 'Basics', to: '/basics' },
      // { name: 'Books', to: '/books' }
    ];

    this.state = {
      links,
      size: 'LARGE',
      mobile: {
        expanded: false
      }
    };

  }

  // TODO remove in componentWillUnmount
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

  toggleMobile() {
    this.setState({
      mobile: { expanded: !this.state.mobile.expanded }
    })
  }

  render() {
    let { links, size } = this.state;
    return (
      <header
        className={classnames({
          [`${styles.headerLarge}`]: size==='LARGE',
          [`${styles.headerSmall}`]: size==='SMALL'
        })}
      >
        <div
          className={classnames({
            [`${styles.logoLarge}`]: size==='LARGE',
            [`${styles.logoSmall}`]: size==='SMALL'
          })}
        >
          {this.props.siteTitle + (size === 'LARGE' ? '' : '://')}
        </div>
        <p
          className={classnames({
            [`${styles.mottoLarge}`]: size==='LARGE',
            [`${styles.mottoSmall}`]: size==='SMALL'
          })}
        >
          {this.props.siteMotto}
        </p>
        <div id={styles.mobileNavToggle}>
          <FontAwesome 
            name="bars"
            size="2x" 
            onClick={this.toggleMobile.bind(this)}
            className={classnames(styles.rightAlign, { [`${styles.hide}`]: this.state.mobile.expanded })}
          />
          <FontAwesome 
            name="times"
            size="2x" 
            onClick={this.toggleMobile.bind(this)}
            className={classnames(styles.rightAlign, { [`${styles.hide}`]: !this.state.mobile.expanded })}
          />
        </div>
        <div className={classnames(styles.mobileNav, { [`${styles.hide}`]: !this.state.mobile.expanded })}>
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
