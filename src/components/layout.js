/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import "./layout.module.css"

import Nav from "./nav"
import Footer from "./footer"

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
      <div>
        <Nav
          siteTitle={data.site.siteMetadata.title}
          siteMotto={data.site.siteMetadata.motto}
        />
        <main>{children}</main>
        <Footer />
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
