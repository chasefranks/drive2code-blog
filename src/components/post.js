import React from 'react';
import { graphql } from 'gatsby';
import Layout from './layout';

const Post = ({ data }) => {
  let post = data.markdownRemark;
  return (
    <Layout>      
      <div dangerouslySetInnerHTML = {{ __html: post.html }}></div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        excerpt
        icon
      }
      html
    }
  }
`

export default Post;
