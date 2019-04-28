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
        }
        render={(data) => {          
          let posts = data.allMarkdownRemark.edges.map(edge => edge.node);
          let images = data.allFile.edges.map(edge => edge.node)
          return (
            <div>
              {posts.map((post, n) => {
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
              })}
            </div>
          )
        }}
      />
    )
  }
}

export default PostPager;
