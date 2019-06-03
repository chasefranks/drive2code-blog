import React from "react";
import Link from 'gatsby-link';

import styles from "./pageNav.module.css";

export default ({ previousPagePath, nextPagePath }) => {
  return(
    <div className={styles.navControls}>
      {previousPagePath ?
        <Link
          className={styles.navLink}
          to={previousPagePath}
        >
          Prev
        </Link>
        :
        null
      }
      {nextPagePath ?
        <Link
          className={styles.navLink}
          to={nextPagePath}
        >
          Next
        </Link>
        :
        null
      }
    </div>
  )
}
