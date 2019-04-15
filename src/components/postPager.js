import React, { Component } from "react";
import PostCard from "./postCard";

class PostPager extends Component {
  render() {
    return (
      <div>
        <PostCard
          link="/posts/gatsby.html"
          title="We made it to Gatsby!"
          date="April 2, 2019"
          icon="/images/gatsby-icon.svg"
          excerpt="Welcome to the new blog, entirely redone in Gatsby! It's been an awesome journey to get here, and while I loved Jekyll, Gatsby gives me more control and flexibility. Plus it's all Javascript at the end of the day."
        />
        <PostCard
          link="/posts/lets-all-use-webpack.html"
          title="Let's all use webpack in 2019!"
          date="April 1, 2019"
          icon="/images/webpack-icon.svg"
          excerpt="I've been using webpack for quite a bit of tasks lately. While it can seem daunting, I want to introduce you to webpack by getting you up and running with a little web development environment for mocking and instant previews. I hope I can convince you to bring webpack into your day-to-day toolchain."
        />
        <PostCard
          link="/posts/getting-started-with-reactjs.html"
          title="Getting Started with ReactJS"
          date="April 1, 2019"
          icon="/images/react-icon.svg"
          excerpt="Welcome to the new blog, entirely redone in Gatsby! It's been an awesome journey to get here, and while I loved Jekyll, Gatsby gives me more control and flexibility. Plus it's all Javascript at the end of the day."
        />
        <PostCard
          link="/posts/a-life-offline.html"
          title="A life offline: some tips"
          date="March 31, 2019"
          excerpt="I've been living offline for the past few months (for various reasons), and would like to discuss how I've adapted and some tips and tricks I've picked up along the way."
        />
      </div>
    )
  }
}

export default PostPager;
