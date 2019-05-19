import React from 'react'
import { graphql } from 'gatsby'

import Layout from './layout'
import PostCard from './postCard'
import PageNav from './pageNav'

const PostPage = ({ data, pageContext }) => {

  let posts = data.allMarkdownRemark.edges.map(edge => edge.node);
  let images = data.allFile.edges.map(edge => edge.node)

  return (
    <Layout>
      <div>
        {
          posts.map((post, n) => {
            let iconImage = images.find(image => image.publicURL.includes(post.frontmatter.icon));
            return (
              <PostCard
                key={n}
                link={post.fields.slug}
                title={post.frontmatter.title}
                date={post.frontmatter.date}
                icon={iconImage ? iconImage.publicURL : null}
                excerpt={post.frontmatter.excerpt}
              />
            )
          })
        }
        <PageNav
          previousPagePath={pageContext.previousPagePath}
          nextPagePath={pageContext.nextPagePath}
        />
      </div>
    </Layout>
  )
}

// this query can use skip, limit from the context
// populated by gatsby-awesome-pagination
export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM d, YYYY")
            excerpt
            icon
          }
          fields {
            slug
          }
        }
      }
    }
    allFile(filter: { sourceInstanceName: {eq: "images" }}) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`

export default PostPage
