---
title: Migrating to NextJS 9.5
date: 2020-10-12T03:26:55.485Z
---
I recently led an effort to migrate our main website at work to NextJS 9.5, and would like to share my thoughts and a few hurdles we had to overcome, mainly in the area of CSS and how our styling is developed and applied. This is meant to be a lighthearted and cathartic discussion, and will be intentionally conversational with the details.

## Changes from 9.1

Our project, originally a migration from Drupal to NextJS, started on version 9.1 of NextJS. This was before css support was built in, so if you wanted to do (what is now standard) an import of your styles in your React component, like

```js
import "./Card.css";

export default Card = props => (
  <div className="card">
  ...
  </div>
)
```

you had to set up that capability in the webpack config yourself. We did this by using the now legacy `next-css` plugin. Since most of our styles are actually SASS, we used the `next-sass` plugin as well. The point is you had to set up the configuration to link styles to components manually. The NextJS [blog](https://nextjs.org/blog) has a very well-written history of how the project has evolved since then.

In the versions between 9.1 and 9.5, NextJS provided out-of-box support for importing .css and .scss files into React components, so imports like the one above would 'just work'. However, they made a very opinionated restriction which proved to be a major hurdle for us to migrate to the new version. To understand this restriction, we have to talk about CSS modules.

## CSS Modules

In our example above, let's say inside of Card.css we have a class called `.card` aptly enough, which styles the div in the usual card-like manner with rounded corners:

```css
.card {
  border: solid 1px
  border-radius: 8px
}
```

Depending on the the webpack configuration, the import statement `import "./Card.css"` results in the css being appended into a single css file. 

This is a problem since it breaks the encapsulation of the Card component. I can't simply use the `Card` component from within another component, as in

```js
import Card from "../Card";

export default Wall = props => (
  <div className="wall">
    props.cards.map(card => (
      <Card key={card.id} {...card} />
    )
  </div>
)
```

Well you can of course, but you have to remember that the class `card` is global. If there is an element with `class="card"`, it will get card styling just by virtue of having imported the Card component. It's very probable that for a large project, components like Nav, Card, Button, will cause these sorts of name conflicts, and CSS specificity makes those fun problems to debug at 4p.m.

To overcome this issue, css [modules](https://github.com/css-modules/css-modules) were created. The idea is to make the class name (card in this case) obscured by padding it with some random characters that are unique to the Card component. The obscured class names are received as the result of the webpack import in an object that maps the original class to the obscured version. For example

```js
import styles from "./Card.css";

export default Card = props => (
  <div className={styles.card}>
  ...
  </div>
)
```

The obscured class name, `styles.card` will look something like

```
Card_card_1a7f5
```

and the bundled css would have

```css
.Card_card_1a7f5 {
  border: solid 1px
  border-radius: 8px
}
```

The last 5 hex characters are the random component-unique aspect I referred to earlier. I think they are the first 5 hex digits of the md5 of the component's relative path, but we're all friends here.

This guarantees that our card class will not conflict with anyone else's, and we can use class names like card in our styles with impunity. Fun stuff right?

In our project, we had hundreds of React components like views, shared components, etc that all had simple global style imports like "import "./Card.css". When I took out a spike story and upgraded the Next and React dependencies, I immediately got the (notorious) error message from the NextJS webpack build

```
Global CSS cannot be imported from files other than your Custom <App>. Please move all global CSS imports to pages/_app.js.
Read more: https://err.sh/next.js/css-global
```

The linked advice tells you that styles imported from a component, **must** be a css module. To start, this means the css file has to end in `.module.css`, 

```
import styles from "Card.module.css"
```

It was easy enough to rename all component local style files in our project. However, the class names would then be obscured in css module fashion. This means all references to class names have to be updated to go through the webpack export, so

```html
<div className="card" >...</div>`
```

has to be changed to

```html
<div className={styles.card} >...</div>`
```

and similarly, through all the markup in every one of our components, views, etc. Lovely. Ideally I planned on an opt-in approach that would allow us to upgrade to the latest version and rely on the out of box SASS support, then gradually migrate to modules. You would 'opt-in' by naming your style file to end with .module.scss and then go through the styles object to get your obscured class names as you develop or migrate the component. Unfortunately, this approach fell through due to my limited knowledge of webpack, and of course, time.

The result was that the migration would have to be a single releasable increment. To get NextJS to build the site, all style files would have to be renamed with the module.scss suffix. Now the site would build, but look and feel would be broken across the board. The work then, became to repair the broken styles by using the obscured class names, page by page.

## The Migration And a Trick We Learned

The team I work with, from devs to QA to PMs, are consummate professionals, and met this challenge undaunted. I explained the constraints and the benefits to the team, and we decided the best approach was to swarm the problem and try to tackle it inside of a sprint (two weeks for us) with subsequent release focusing on just the upgraded website. I broke the subtasks out in JIRA, one for each page. Dev/Ops created a dedicated AWS environment with CI pipeline to avoid interrupting the flow of our other stories. We now had a real party on our hands.

We had 2 or 3 impromptu knowledge transfers and learning sessions among the devs, as we learned the subtleties of CSS and SASS modules. One of the techniques that emerged, and ended up providing a shortcut and escape hatch of sorts, involved so called global exceptions. In a css module file, if you wrap an identifier with `:global` as in

```css
:global(.card) {
  border: solid 1px;
  border-radius: 8px;
}
```

the class name `card` passes through the webpack import unaltered. It even works in block form as well, so if you have a scss block like

```scss
.card {
  border: solid 1px;
  border-radius: 8px;
  .contact-me {
    background-color: black;
    color: grey;
  }
}
```

then you can wrap the whole thing in `:global {...}` to pass all class names unaltered

```scss
:global {
  .card {
    border: solid 1px;
    border-radius: 8px;
    .contact-me {
      background-color: black;
      color: grey;
    }
  }
}
```

Nice right? We found an easy 'codemod-able' migration path! Just rename the files and wrap the style contents with `:global`, promising to go back and modularize on a rainy day. 

Nope.

If you think about it, this would be too easy and violates the css module philosophy and NextJS opinion. You would end up with resultant selectors 

```css
.card { ... }

.card .contact-me { ... }
```

that are not 'local' to the Card component at all. This means the css module is not *pure*, terminology that I can't find anywhere on the internet except webpack css-loader [docs](https://webpack.js.org/loaders/css-loader/#pure-css-css-modules-and-postcss) and the NextJS error console.

In any event, it makes sense, so we carried on. The pattern we ended up with that helped was to wrap the styling in :global block with an outer local class name

```scss
.my-component {
  :global {
    /* existing styling */
    .foo {
      .bar {
        a {
          color: green;
        }
      }
    }
  }
}
```

This makes the module pure since all selectors would start with the obscured outermost class name

```css
.MyComponent_my-component_63d7a .foo .bar a {...}
```

linking uniquely to the component and preventing name collisions. I should say here that the intended purpose of the global exception is to override real global styles, not to save typing. For example, if your project has Bootstrap linked in globally and you want to override some of modal styling from a component's css module, you would do

```scss
.card {
  :global(.modal) {
    /* modal overrides */
  }
}
```

The block form of `:global` proves to be convenient for this sort of thing too.

## Conclusion

The end result was we bit the bullet and finished the work inside of the sprint. Release to prod was a lot fun with `git`, but not too bad and deployment went off without a hitch. The new upgraded site went online with no discernible breakages to look and feel, and now we have nice localized and minified css, and the benefits of the new version for making additional improvements.

