# Jobcoiner

Welcome to Jobcoiner, a viewer for Jobcoin addresses and transactions! This project was built using React and talks to the Gemini Jobcoin API.

## Prerequisites

- **nvm**: We suggest you use [nvm](https://github.com/nvm-sh/nvm) to manage your Node version on your machine. See the [`.nvmrc`](.nvmrc) file in the project to use the recommnded Node version.
- **yarn**: We suggest you install [yarn](https://yarnpkg.com/) globally. Its a great package manager and the following steps will utilize `yarn` in the examples.
- **typescript**: The project was written using [TypeScript](https://www.typescriptlang.org/). It would be great to familiarize yourself with TypeScript to understand some of the types used within the code.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To develop on the project you have the following available scripts: `start`, `build`, `test`, `eject`. (See docs as part of the [react-scripts](https://create-react-app.dev/docs/available-scripts/) for more info):

For the purposes of a demo, you won't need most of the scripts. We suggest running:

```
$ yarn && yarn start
```

This will spin up the development server at `localhost:3000` and allow you to see the app live! Poke around the frontend and try to break it!

## Technical Design

This project uses TypeScript and the latest version of React. Throughout the code, you'll see usage of TypeScript features like intersection types, as well as newer React features like hooks being used. To give some insight into the libraries that were added...

- `chakra-ui` (https://chakra-ui.com/)
  - Amazing UI library for React. A little heavy in terms of bundle size, but Chakra has beautiful components and allowed me to focus less on CSS styles and use their intuitive [Style Props](https://chakra-ui.com/docs/features/style-props) to allow for very readable and developer friendly styles right in the React component code.
- `recharts` (https://recharts.org/en-US)
  - This data visualization library was used to provide the visuals for the transaction history graph. It provides a neat API with clean animations.
- `axios` (https://github.com/axios/axios)
  - This is arguably one of the best HTTP clients for the browser and Node. Promise based and has extensible features.
- `reach/router` (https://reach.tech/router)
  - Made by the team behind React Router, Reach is a lightweight router that is simple to use and very powerful. It allows for a components to be conditionally rendered based on the current URL path. Here we use it to navigate between the sign in and home dashboard screens. This would be leveraged further if we needed authentication and redirects for unauthenticated users.

## Project Walkthrough

Made with Create React App, this project is fairly standard in terms of design.

- Start off at `public/index.html`. This gets served with all the bundled JS when this app is deployed. From there, the JS initializes React which renders DOM into the <div#root>.
- The Javascript begins at [`index.js`](src/index.js). There you will find where React is bootstrapped and rendered into the DOM mentioned above.
- [`App.tsx`](src/App.tsx) is the starting point of the React component heirarchy. There you will find the `@reach/router` `<Router />` component set up to allow for dynamic switching based on the current URL.
- For this small app, only two page level React components were used (see [Login.tsx](src/Login.tsx), [Home.tsx](src/Home.tsx)). These page level components are built up of smaller components composed in the `src/components` folder.
- The `src/api` folder contains API request related files (axios instances that invoke http requests)
- The `src/util` folder is meant to separate heavier business logic away from the render/view layers. This way our UI code isn't cluttered with the raw business logic behind decorating API responses for rendering.

## What I Would Add

1. Tests
   - Given more time, I would write tests to assert the util functions, mock axios API calls, and add UI tests specifically around the state when the API call is being resolved and the UI should be in a loading state.
2. CSS/Sass

   - To really get familiar with Chakra UI, the component library I used in the project, I opted to fully embrace the Style Props paradigm and was able to style the entire app using no raw CSS/SCSS. I'm a huge fan of BEM or CSS Modules methodologies, so I would lean towards those standard ways of doing things as opposed to doing styling purely within the React code.

3. Error Handling
   - Error handling itself is a huge task for a large frontend app (if you want to do it in a scalable way). I would put more thought process into the error handling and work with designers to see if alerts, modals, or just toast messages would be adequate for the product being built.
