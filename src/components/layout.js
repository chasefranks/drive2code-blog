/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styles from "./layout.module.css"

import Nav from "./nav"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            motto
          }
        }
      }
    `}
    render={data => (
      <>
        <Nav
          siteTitle={data.site.siteMetadata.title}
          siteMotto={data.site.siteMetadata.motto}
        />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Drive2Code
          Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
