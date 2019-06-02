import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import LatestPost from "../components/latestPost"

const IndexPage = (props) => (
  <Layout>
    <SEO title="Home" keywords={[`javascript`, `software craftsmanship`, `react`, `gatsby`, `aws`]} />
    <h1>Welcome!</h1>
    <p>
      First, I'm glad you're here! Feel free to dive right into the latest post below, find out who I am in the <Link to="/about">About</Link> section.
    </p>
    <p>
      This blog is a continuation of my <a href="https://chasefranks.github.io">previous blog</a> I maintained on Github pages. We'll probably be doing a lot of WIP (work in progress) as I roll out this site, but I wanted to get an early release and start putting up content as soon as possible.
    </p>
    <LatestPost {...props}/>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
            icon
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`

export default IndexPage
