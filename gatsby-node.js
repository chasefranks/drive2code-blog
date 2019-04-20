/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// enrich each markdown node with slug used to link to the page
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    // build slug from markdown node
    const slug = createFilePath({node, getNode, basePath: 'posts'});
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
        }
      }
    }
  }
  `).then((result) => {
    let { data: { allMarkdownRemark:  { edges } } } = result;
    edges.forEach(({ node }) => {
      console.log('creating page from node', node);
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/components/post.js'),
        context: {
          id: node.id
        }
      })
    })
  });
}
