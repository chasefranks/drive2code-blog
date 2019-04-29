module.exports = {
  siteMetadata: {
    title: `Drive2Code`,
    motto: `A blog about being a developer, and a human`,
    description: `The personal blog of Chase Franks`,
    author: `Chase Franks`,
    email: `clf11235@gmail.com`,
    about: `A fullstack Javascript developer working in the Dallas Fort Worth area. Interest include ReactJS, ExpressJS, NodeJS, and anything devops cloud. A firm adherent to software craftsmanship and available for hire.`
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
    // TODO what does this do? does icon become the favicon?
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
    'gatsby-transformer-remark'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
