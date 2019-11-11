import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

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
      }
    `}
    render={
      data => {
        let social = data.site.siteMetadata.social
        let channels = Object.keys(social)
        // map of social channel to fontawesome icon
        const channelToIcon = {
          email: faEnvelope,
          github: faGithub,
          linkedin: faLinkedin
        }
        return (
          <div className={styles.findMe}>
            <p>Find Me:</p>
            {
              channels.map(channel => (
                <a key={channel} href={social[channel]}>
                  <FontAwesomeIcon 
                    icon={channelToIcon[channel]}
                    size="lg"
                  />
                </a>
              ))
            }
          </div>
        )
      }
    }
  />
)

export default Social
