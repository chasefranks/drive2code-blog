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
          let {
            allMarkdownRemark: {
              edges: posts
            },
            allFile: {
              edges: images
            }
          } = data; // TODO destructure into the array as well, so posts is an array of markdown remark nodes, images is an array of file nodes, etc. and we dont' have to descend into the node property

          return (
            <div>
              {posts.map((post, n) => {
                let iconImage = images.find(image => image.node.publicURL.includes(post.node.frontmatter.icon));

                return (
                  <PostCard
                    key={n}
                    link={post.node.fields.slug}
                    title={post.node.frontmatter.title}
                    date={post.node.frontmatter.date}
                    icon={iconImage ? iconImage.node.publicURL : null}
                    excerpt={post.node.frontmatter.excerpt}
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
