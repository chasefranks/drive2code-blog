/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { paginate } = require('gatsby-awesome-pagination');

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

    // create page for each page of posts: posts, posts/2, etc
    paginate({
      createPage,
      items: edges,
      itemsPerPage: 5,
      pathPrefix: '/posts',
      component: path.resolve('./src/components/postPage.js')
    })

    // create page for each blog post
    edges.forEach(({ node }) => {
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
