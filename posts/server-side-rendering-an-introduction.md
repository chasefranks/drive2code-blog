---
title: 'Server-side Rendering: An Introduction'
date: 2019-11-30T23:26:09.594Z
disqus: true
---
In this article, we assume familiarity with [React](https://reactjs.org/). You should be able to get the gist of this article without React knowledge, but future articles will give examples using React components. For all practical purposes, a React component is a piece of a webpage that can be **rendered**, which means to display the component in the browser.

## Server-side versus Client-side

In the server/client model, a _client_ (in this case your browser), makes an HTTP request over the network to a _server_. The job of the server is to respond to requests that speak the HTTP language. Usually this response is a bunch of text representing the webpage you want to view in _HTML_, which stands for hypertext markup language. The browser uses the html response to paint what you see on the screen.

A _web application_ usually does a little more before it returns html. It usually goes to a database or an API (application programming interface) server to get data that is transformed into the content you see (like a list of employees for example). An API allows you to update the data as well, and is almost always backed by a database server.

In the realm of web application technologies, there is a (nerd) battle for where all of the data processing will take place: on the server or on the client. Believe it or not, there is another model that is winning favor amongst programmers and businesses that puts almost all of the logic on the client-side.

### The Traditional Model

Here is a diagram showing the data flow for a traditional web app:

![traditional server-side app](/assets/images/traditional-web-app.png "A Traditional Server-side App")

1. The browser makes an initial `GET` request to the server for the index.html page.
2. The server receives the request, and fetches data from either an API server which then connects to a database, or in some cases the server goes to the database directly.
3. The server takes the data and usually inserts it into some sort of template. The template looks like html, but has placeholders for the data.

Some of the server-side technologies used here are Java (J2EE), Spring MVC, PHP, ExpressJS, etc. One of the things to keep in mind is that database connections usually require some care and involve traditional server-side languages like Java and Python in order to make use of the available drivers (special programs that speak the unique and usually proprietary database's language). This is why the browser doesn't connect to the database directly, and also why it makes sense (even for the server) to go through an API to work with the data. In fact, an API server is nothing but a special web server so speaks HTTP. Since browsers have no problem speaking HTTP, they can connect to an API as well for their data needs. This is the key point.

### The Single-Page Application

The single page application (SPA) concept was made popular by Angular, and is also the predominant model for React applications. Here we depict the flow for a typical SPA:

![a typical SPA](/assets/images/typical-spa.png "A Typical SPA")

In this model,

1. The browser makes its usual HTTP request for index.html.
2. The server returns a _shell_ page with `<div id="root"></div>` that will hold the content, as well as a set of scripts that will render the content into the root div. This is where the React code is.
3. The Javascript code that is now loaded and running the browser (client-side) reaches out to the API for any data it needs (in the `componentDidMount` or `useEffect` hook), and passes the data into the components as properties or state.

What makes this a single page app? Usually when you enter a new url into the browser's address bar, the browser makes a _new_ request to the server. But in most React apps, the scripts intercept your request and use the new path you entered to update the same React component tree, all within the Javascript engine running in the browser.

## Pros and Cons

### SEO and Web Crawlers

Google and other search engines use little programs called spiders or crawlers to visit links on the web and index their content. If you take a look at that shell page for a SPA, it has no actual content. The spider program is not a browser environment. In fact, it runs much closer to the HTTP protocol and is more similar to something like `curl` on Linux. When I `curl`ed the example app I'm writing for this blog series, I get the shell page:

```
curl localhost:3000
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!-- these scripts run React code that controls the content inside of the root div -->
    <script src="/static/js/bundle.js"></script>
    <script src="/static/js/0.chunk.js"></script>
    <script src="/static/js/main.chunk.js"></script></body>
</html>
```

The crawler and hence Google can't get a glimpse into the content of your site, because it needs to run the Javascript code in those scripts, and those scripts are trying to manipulate a browser environment that wouldn't be there.

### Security

The traditional model offered more security. Usually APIs require an access token to be able to access the data. [JSON web tokens](https://jwt.io) (JWTs) are one way securing APIs. Databases are also heavily protected with username/password. If you look at the diagram of the traditional model, the connection to the API and database is behind the server, within the company's infrastructure. The SPA forces you to embed the API access token in the scripts. It's still secure, but you have to shift your security model and be a little more careful in a SPA.

### Initial Load Time

Since the SPA has to make an initial request to fetch data before it can load content, there can be a considerable delay before the site seems usable.

### Developer Experience

SPAs offer complete developer control since the app is entirely determined by Javascript. The code the web developer writes can go to the API directly to get the data, so there is much less friction, and no server-side templating language (like Spring Thymeleaf or .jsp) to keep up with.

In fact, this is one of the things I think React has done very well. You only need to wrap your mind around JSX (which is very natural and easy to pick up, and exactly where the need for templating went to). The typical React project is arranged in files that focus on each component, and with [webpack](https://webpack.js.org), all of the artifacts needed for web development (like sass, css, images, etc) can be imported. Aside from live data, you have everything you need in one place to create a fully functional app (web or even mobile with React Native).

## Server-side Rendering

Server-side rendering (SSR) basically mixes these two approaches to get the best of both worlds. It does this by performing an initial render of a React component tree on the server so that the first request results in fully populated html content (great for SEO crawlers and page load time). Then (in the background but very quickly), you perform a **hydration** by loading the React code and creating a React component tree from the initial html.

## Conclusion

I hope you enjoyed this high-level overview. My goal is to post short articles at least once a week that help me and hopefully readers out there understand this content better by communicating, and hence become better more efficient developers. Please use the comments to let me know anything you want me to include in an upcoming post or any inaccuracies.

Our next post in this series will take a very simple client-side React app and we will gradually migrate it over to a server-side rendered app using basic tools like ExpressJS and a little Babel. This basic example should set the stage for our introduction to [NextJS](https://nextjs.org).
