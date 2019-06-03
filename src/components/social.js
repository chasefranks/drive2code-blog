import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styles from "./social.module.css"

const Social = ({ data }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            social {
              email
              github
              linkedin
            }
          }
        }
        allFile(filter: { sourceInstanceName: {eq: "social-icons" }}) {
          edges {
            node {
              publicURL
            }
          }
        }
      }
    `}
    render={
      data => {
        let social = data.site.siteMetadata.social
        let channels = Object.keys(social)
        let icons = data.allFile.edges.map(edge => edge.node.publicURL)
        return (
          <div>
            <p>Find Me:<br/>
              {
                channels.map(channel => {
                  let channelIcon = icons.find(icon => icon.includes(channel))
                  return (
                    <span>
                      <a href={social[channel]}>
                        <img
                          className={styles.icon}
                          src={channelIcon}
                          alt={`social icon for ${channel}`}
                        />
                      </a>
                    </span>
                  )
                })
              }
            </p>
          </div>
        )
      }
    }
  />
)

export default Social
