---
title: From webpack to Vite
short: On this article I explore Factorial’s use of webpack, the challenges I faced, the investigation for a replacement, the solution proffered and the team’s adoption of this solution.
author: Marc Torrelles
date: "2023-01-16T00:00:00.000Z"
hero_image: /webpack-to-vite/hero.jpg
original_article:
  link: https://labs.factorialhr.com/posts/from-webpack-to-vite
  name: Factorial Labs
---

# About bundlers

JavaScript started as a language for simple, isolated tasks like changing an element class or setting a timer. However, as the web evolved, new needs arose, and developers started using JavaScript to create big, complex applications on the client side. The rise of AJAX revolutionized the way web pages were built, allowing developers to create more dynamic and interactive experiences.

Node.js appeared and new frameworks like Backbone, Angular.js, and React flourished. JavaScript, which was once used for simple tasks, was now serving a completely different purpose. These new tools allowed developers to create entire applications with a solid architecture that took inspiration from backend applications while also creating new concepts. Companies like Facebook started building massive client-side applications, and "frontend developers" became a popular job title as this new way of building web pages exploded.

With the growth of JavaScript came an ecosystem of tools, including bundlers. Bundlers combine all the separate JavaScript files into a single file that browsers can consume. In the early days of JavaScript applications, this was the only way to serve these large, complex applications. At Factorial, we've been using webpack for more than 5 years to develop and build our frontend application.

# Webpack’s drawbacks

## Lack of Speed

Our frontend application has over 700k lines of code, excluding external packages. This means that when webpack starts up, it has to bundle all that JavaScript into a single file and serve it to the browser. And let me tell you, that takes a long time for a project of this size.

![Lack of speed](/webpack-to-vite/lack-of-speed.png)

While these numbers have improved over time, thanks to webpack's caching system and performance improvements, it's still a slow process. The Hot Module Replacement (HMR), which is responsible for bundling the code you're changing, used to take more than 10 seconds per change. This made developers feel like they were waiting forever and slowed down our development process.

## It doesn't scale well

As our company grew, we added more features and more files to our application. This made webpack slower and slower and consumed more of our machine's memory. We knew that at some point, our current solution wouldn't be able to run in any of our dedicated environments.

## Out-of-memory crashes

At Factorial, we need to run several services in parallel, including a database, a Ruby on Rails monolith, a Sidekiq instance, and our frontend application built with React, among other small services. This led to frequent out-of-memory (OOM) crashes that disrupted our development flow and forced us to restart the frontend service and hope it didn't crash again. It was a terrible developer experience.

## Disposable environments

We use Gitpod as our cloud-based development environment solution, and the developer experience is just amazing. However, dealing with webpack in that scenario was a pain. As you can see from the table, the cold start time was disastrous. It took longer for the remote environment to be available than it took me to read all my Slack messages – and I get a lot of them.

We tried to improve the situation by using caching, but it didn’t go well. Webpack's cache isn't easily shareable between environments, so we had to cold start the frontend application on each workspace boot. This added to the already slow startup time and made the experience even worse.

# New tools on the horizon

Given all these previewed problems, as soon as we had some bandwidth, we started looking for alternatives. New tools with revolutionary results appeared, so we investigated them deeply.

## Esbuild

Esbuild is a JavaScript bundler that shows promising results compared to its older counterparts. It's written in Go and compiles to native code, and its performance is impressive. However, it doesn't have development support, so we wouldn't be able to use it while developing our code. Additionally, it doesn't support code splitting, so we wouldn't be able to use it in our application.

## SWC

SWC or "Speedy Web Compiler" is another bundler that uses Rust under the hood. It has a large community and is used by many companies. Like esbuild, it's very fast at compiling and transpiling, but it doesn't have development support, so we couldn't use it in our workflow.

## Vite

Vite is not a bundler or a compiler, and it's not written in a modern language. It's a wrapper of various tools that work together to solve the development and bundling of front-end applications.

It uses esbuild for dependencies (the ones inside node_modules), bundling each of them into a single JavaScript file and sending it to the client, and doing the joins using dynamic import. It has impressive performance, with a fast cold start time. During the development process, it serves all other files over the wire as is, only performing strict transformations like transpiling TypeScript to JavaScript. It also uses esbuild for this purpose.

For compilation, it uses Rollup. As mentioned earlier, esbuild doesn't support code splitting, but Rollup does. While we didn't see any improvement in this area, as webpack and Rollup gave us similar results in terms of bundling times, Vite still seemed like a good fit for our needs. So we went ahead and tried it.

# Adopting Vite

We encountered some challenges during the process of adopting Vite. Although, the process should have been simpler with a smaller codebase.

## Sass

Factorial's frontend is over 6 years old, and at the time, the most modern way of dealing with CSS was using Sass. We now mostly use vanilla-extract in new components, but we still have some tokens in our design system that Sass needs to be aware of. So we use its JavaScript API. This was one of the most difficult issues we faced.

Although it's not documented, we were able to pass it to the CSS options inside vite.config.ts:

```js
css: {
  preprocessorOptions: {
    scss: {
      functions: yourScssJsFunction,
    },
  },
}
```

This allows us to read the design system variables and inject them directly into Sass.

## Code splitting our app

We have 7719 files in our frontend src folder. This means that every time we open the frontend application in development, Vite would serve 7719 assets over the wire, plus all the external dependencies.

We tried it, and it was a disaster. The initial boot time was so high that it didn't make sense to switch to Vite. Even with some code splitting, the performance was still not acceptable.

So we came up with the idea of splitting the code into more chunks. The first approach that came to mind, and also the most logical one, was to split it by the parent route of each page. This means that all the components inside /employees are a single chunk. This saved us a lot of time during the initial bootstrap and also benefited our clients by sending smaller JavaScript assets.

With this change, we were able to significantly improve the performance of our application on both sides. The initial boot time was significantly reduced when developing, and the overall experience was much smoother for our users.

Here's the code. We use Loadable Components to be able to dynamically import the file we want to use, as it's currently a limitation of React.lazy.

```ts
import loadable, { type DefaultComponent } from "@loadable/component"
import type { RouteObject } from "react-router-dom"

interface LasyRouteAttrs {
  path: string
  loadFn: () => Promise<DefaultComponent<unknown>>
}

const buildLazyRoute = ({ path, loadFn }: LazyRouteAttrs): RouteObject => ({
  path: `${path}/*`,
  element: React.createElement(loadable(loadFn)),
})
```

# Implementation

We divided the implementation into two parts: the development and the build.

In the development phase, we configured everything and offered the tool to our engineering team. Some early adopters gave us feedback on some small parts to fix. Since the overall feeling was positive, we decided to use it as the default for the entire team. We repeated the same process and fixed some small issues that arose.

Vite uses different tools for development and building. esbuild is used for development, while roll-up is used for building. This carries some risks, as we cannot use the development application with total certainty that the result will be the same as the built application. Therefore, we thoroughly tested it using E2E tests and a lot of manual testing.

Once we felt confident enough, we did the swap. The application worked well, with only two bugs regarding Intl and localizations. Overall, the release was a success!

# Vite's acceptance

The acceptance of Vite among our engineering team has been generally positive. Although there have been a few detractors, the overall feeling toward Vite has been positive and most of our engineering team prefers it over webpack.

There were a few drawbacks, however. Let me describe them.

## Initial loading time

Chunking our app helped us reduce the initial loading time significantly. However, this loading time may worsen in situations of poor network connectivity.

We are actively working on improving our app so that the initial fetch time is reduced. Some proposals that we are considering include using GraphQL to fetch our data, which would prevent us from loading most of the store files we have, and also splitting the app into even more parts.

## E2E tests

We have an end-to-end suite of tests that use Cypress. Using them with Vite's serve mode is quite painful, as the initial load time is too long and it happens for every test. This is not an acceptable situation.

Luckily, Vite has a mechanism to build and serve files easily. With the power of Vite preview, we can build and serve our application with no extra configuration. This, of course, prevents us from making changes in the front end while running our E2E suite, but at the moment it is an acceptable situation to deal with.

We are still looking for a suitable setup that allows us to combine the speed of E2E execution with a better development experience.

# Results

Here you can find a table with the results compared with webpack’s one. As you can see, the total time to load the application improved significantly, as well as the HMR times.

![Results](/webpack-to-vite/results.png)

# Conclusions

We are confident that switching to Vite has significantly improved the development experience of the frontend application. The transition was smooth, and the tool has been well-received by our team. Vite addresses the slow startup times, poor scaling, and out-of-memory crashes that we experienced with webpack.

We are excited about the upcoming features for Vite, as well as the improvements in esbuild and its new react plugin. We are currently testing the new version of it and are impressed by the ease of development it provides. Also, there’s a new plugin for React that uses SWC. A big kudos to the maintainers and contributors of Vite for their great work, way to go!
