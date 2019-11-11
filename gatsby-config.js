module.exports = {
  siteMetadata: {
    title: `Drive2Code`,
    motto: `A blog about being a developer, and a human`,
    description: `The personal blog of Chase Franks`,
    author: `Chase Franks`,
    email: `chase.franks@drive2code.com`,
    about: `My name is Chase Franks, and I'm a fullstack Javascript developer working in the Dallas Fort Worth area. My interests include ReactJS, NodeJS, APIs and serverless, and anything that makes development fun, productive, and enjoyable. A firm adherent to software craftsmanship and writing clean code. When all else fails, I just push buttons until it looks right.`,
    social: {
      email: `mailto:chase.franks@drive2code.com`,
      github: `https://github.com/chasefranks`,
      linkedin: `https://www.linkedin.com/in/chasefranks`
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: 'src/typography'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/posts`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'images',
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1080
            }
          },
          {
            resolve: `gatsby-remark-prismjs`
          }
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
