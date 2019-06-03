import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./about.module.css"

const About = ({ data }) => {
  let {
    site: {
      siteMetadata: {
        about,
        email
      }
    },
    filename: {
      childImageSharp: {
        fixed
      }
    }
  } = data;
  return (
    <Layout>
      <SEO title="About Me" />
      <h2>About Me</h2>
      <Img
        className={styles.profile}
        fixed={fixed}
        alt="a profile pic of blogger drive2code"
      />
      <p>{about}</p>
      <h3>Contact</h3>
      <p>Feel free to contact me via email to network, suggest topics, or ask questions about software develpment.</p>
      <p><a href={`mailto:${email}`}>Email</a></p>
    </Layout>
  )
}

export default About

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
        author
        email
        about
      }
    }
    filename: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fixed(height: 200, width: 200) {
          base64
          tracedSVG
          aspectRatio
          width
          height
          src
          srcSet
          srcWebp
          srcSetWebp
          originalName
        }
      }
  	}
  }
`
