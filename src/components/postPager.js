import React, { Component } from "react";
import PostCard from "./postCard";
import { StaticQuery, graphql } from "gatsby";

class PostPager extends Component {

  render() {
    return (
      <StaticQuery
        query={
          graphql`
            query {
              allMarkdownRemark {
                edges {
                  node {
                    frontmatter {
                      title
                      date
                      excerpt
                    }
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          `
        }
        render={(data) => {
          let { allMarkdownRemark: { edges: posts } } = data;
          return (
            <div>
              {posts.map((post, n) => (
                <PostCard
                  key={n}
                  link={post.node.fields.slug}
                  title={post.node.frontmatter.title}
                  date={post.node.frontmatter.date}
                  icon="/images/gatsby-icon.svg"
                  excerpt={post.node.frontmatter.excerpt}
                />
              ))}
            </div>
          )
        }}
      />
    )
  }
}

export default PostPager;
