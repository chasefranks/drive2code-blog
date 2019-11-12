import React from 'react';
import { graphql } from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';
import Layout from './layout';

const Post = ({ data }) => {
  let post = data.markdownRemark;
  let { site: { siteMetadata: { url } } } = data;
  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML = {{ __html: post.html }}></div>
      { post.frontmatter.disqus && (
        <Disqus 
          config={{
            identifier: post.id,
            title: post.frontmatter.title,
            url: `${url}${post.fields.slug}`
          }}
        />
      )}
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      }
      frontmatter {
        title
        icon
        disqus
      }
      html
    }
    site {
      siteMetadata {
        url
      }
    }
  }
`

export default Post;
