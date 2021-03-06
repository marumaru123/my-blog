/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    //  const { createPages } = boundActionCreators;
  const { createPage } = actions	

  const postTemplate = path.resolve('src/templates/blogTemplate.js');

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(res => {
      if (res.errors) {
	  return Promise.reject(res.errors)
      }
      res.data.allMarkdownRemark.edges.forEach(({ node }) => {
	  const path = node.frontmatter.path
	  createPage({
	      path,
	      component: postTemplate,
	      context: {
		  path,
	      },
	  })
      })
  })
};
