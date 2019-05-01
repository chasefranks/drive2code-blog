---
title: Let's all use webpack in 2019!
date: April 1, 2019
icon: webpack
excerpt: I've been using webpack for quite a bit of tasks lately. While it can seem daunting, I want to introduce you to webpack by getting you up and running with a little web development environment for mocking and instant previews. I hope I can convince you to bring webpack into your day-to-day toolchain.
---
# Let's All Use Webpack in 2019!

I've been using webpack for quite a bit of tasks lately. While it can seem daunting, I want to introduce you to webpack by getting you up and running with a little web development environment for mocking and instant previews. I hope I can convince you to bring webpack into your day-to-day toolchain.

First, let's start with some code. Start up a simple npm project with `npm init -y`, then to that project add a little file called `webpack.config.js` with this content:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    /*
      all of the static pages for this mock...we would do this
      in an entirely different way in Gatsby of course
    */
    new HtmlWebpackPlugin({
      title: 'Drive2Code',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'We Made It to Gatsby!',
      template: './src/posts/gatsby.html',
      filename: 'posts/gatsby.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Let\'s all use webpack in 2019',
      template: './src/posts/lets-all-use-webpack.html',
      filename: 'posts/lets-all-use-webpack.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Getting Started with ReactJS',
      template: './src/posts/getting-started-with-reactjs.html',
      filename: 'posts/getting-started-with-reactjs.html'
    }),
    new HtmlWebpackPlugin({
      title: 'A life offline: some tips',
      template: './src/posts/a-life-offline.html',
      filename: 'posts/a-life-offline.html'
    }),
    new CopyWebpackPlugin([
      {
        from: './static/images',
        to: 'images'
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      /*
       * this will only work for dynamic resolution of images
       * for example, you can't import into our static html
       * mock here
       */
      /*{
        test: /images\/.+(\.png|\.svg|\.jpg)$/,
        use: [
          'file-loader'
        ]
      }*/
    ]
  }
};
```

Good?
