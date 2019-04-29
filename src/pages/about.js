import React from "react"
import { graphql } from "gatsby"

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
    file: {
      publicURL: profileSrc
    }
  } = data;
  return (
    <Layout>
      <SEO title="About Me" />
      <h2>About Me</h2>
      <img
        className={styles.profile}
        src={profileSrc}
        alt="a profile pic of blogger drive2code"
      />
      <p>{about}</p>
      <h3>Contact</h3>
      <p>I'm not really on social media, so feel free to contact me via email to network or ask questions about software develpment</p>
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
    file(relativePath: {eq: "profile.jpg" }) {
      publicURL
    }
  }
`
