import React from "react"
import { graphql } from "gatsby"
import profile from "../images/profile.jpg";

import Layout from "../components/layout"
import styles from "./about.module.css"

const About = ({ data }) => {
  let {
    site: {
      siteMetadata: {
        about,
        email
      }
    }
  } = data;
  return (
    <Layout>
      <img className={styles.profile} src={profile} />
      <h2>About Me</h2>
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
  }
`
