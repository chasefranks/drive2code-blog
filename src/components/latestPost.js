import React from 'react'
import PostCard from './postCard'

const LatestPost = ({ data }) => (
  <div>
    <h3>Latest Post</h3>
    {
      data.allMarkdownRemark.edges
        .map(edge => edge.node)
        .map((node, index) =>
          <PostCard
            key={index}
            link={node.fields.slug}
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            excerpt={node.excerpt}
          />
        )
    }
  </div>
)

export default LatestPost
