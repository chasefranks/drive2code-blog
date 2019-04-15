import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostPager from "../components/postPager"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <PostPager />
  </Layout>
)

export default IndexPage
