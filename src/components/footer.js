import React from 'react'
import { Link } from 'gatsby'
import styles from './footer.module.css'

import Social from './social'

const Footer = () => (
  <footer>
    <div className={styles.contentWrapper}>
      <div className={styles.left}>
        Powered by <a href="https://www.gatsbyjs.org">Gatsby</a>
        <Social />
      </div>
      <div className={styles.right}>
        <b>Pages</b>
        <ul>
          <li><Link to='/posts'>/posts</Link></li>
          <li><Link to='/about'>/about</Link></li>
          <li><a href="https://chasefranks.github.io">chasefranks.github.io</a></li>
        </ul>
      </div>
    </div>
    <div className={styles.copyright}>
      <Link to='/'>Drive2Code</Link> © {new Date().getFullYear()}
    </div>
  </footer>
)

export default Footer
