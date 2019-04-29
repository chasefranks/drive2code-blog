import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
//
// "site": {
//       "siteMetadata": {
//         "description": "The personal blog of Chase Franks",
//         "author": "Chase Franks",
//         "email": "clf11235@gmail.com",
//         "about": "A fullstack Javascript developer working in the Dallas Fort Worth area. Interest include ReactJS, ExpressJS, NodeJS, and anything devops cloud. A firm adherent to software craftsmanship and available for hire."
//       }
//     }

const About = ({ data }) => {
  let { site: { siteMetadata: { about, email } } } = data;
  return (
    <Layout>
      <SEO title="About Me" />
      <h2>About Me</h2>
      <img
        style={
          {
            height: '200px',
            float: 'right',
            'border-radius': '100px',
            'margin-left': '25px'
          }
        }
        src="/static/profile-b3b6b3de0797bd13ec90ab92515ce091.jpg"
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
  }
`
