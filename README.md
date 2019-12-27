### Installation
----

1. Make sure you have the latest version of [Node.js](https://nodejs.org/en/download/)

2. [node package manager](https://docs.npmjs.com/about-npm/), run the following command in the `CLI` (command line interface):
```
npm install -g npm@latest
```
3. Create a `package.json` file, run the following command in the `CLI` (command line interface):
```
npm init -y
```

### Global dependencies

1. Webpack

---
- webpack
- webpack-cli
- webpack-dev-server
- webpack-merge

```
npm i webpack webpack-cli webpack-dev-server webpack-merge --save
```

2. Babel

---
- @babel/core
- @babel/polyfill
- @babel/preset-env
- babel-loader
```
npm i @babel/core @babel/polyfill @babel/preset-env babel-loader --save-dev
```

3. Productivity
---
- html-webpack-plugin
- html-loader
- style-loader
- css-loader
- node-sass
- sass-loader
- mini-css-extract-plugin
- optimize-css-assets-webpack-plugin
- clean-webpack-plugin
- file-loader
- copy-webpack-plugin

```
npm i html-webpack-plugin html-loader style-loader css-loader node-sass sass-loader mini-css-extract-plugin optimize-css-assets-webpack-plugin clean-webpack-plugin file-loader copy-webpack-plugin --save-dev
```

**Package.json scripts**

---
```
"scripts": {
   "start": "webpack-dev-server --config webpack.dev.js --content-base src/ --open",
   "build": "webpack --config webpack.prod.js"
},
```

**If we use *React.js***

---
1. `npm i react react-dom react-scripts --save`

2. Babel setup:
- @babel/preset-react
- @babel/plugin-syntax-jsx
- @babel/plugin-transform-react-display-name
- @babel/plugin-transform-react-jsx
- @babel/plugin-transform-react-jsx-self
- @babel/plugin-transform-react-jsx-source
- @babel/plugin-proposal-class-properties
```
npm i @babel/preset-react @babel/plugin-syntax-jsx @babel/plugin-transform-react-display-name @babel/plugin-transform-react-jsx @babel/plugin-transform-react-jsx-self @babel/plugin-transform-react-jsx-source @babel/plugin-proposal-class-properties --save-dev
```

And in `webpack.config.js` file add following:
```
query: {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-class-properties']
 }
```

If we want to use
*[`React router`](https://www.npmjs.com/package/react-router-dom)*:

  ```
  npm i react-router-dom
  ```

1. Add in `webpack.config.js` file: `devServer: { historyApiFallback: true }`
2. In `index.html` file `<head>` element, add: `<base href='/' />`



***Additional information:***

`environment variables`:

---
- Install [`dotenv-webpack`](https://www.npmjs.com/package/dotenv-webpack) and follow the instructions from there
- Create `.env` file in the `root folder` 

`Promises / Fetch` for IE:

---
- es6-promise
- isomorphic-fetch

```
npm i es6-promise isomorphic-fetch --save-dev
```

And in the main `index.js` file add:
```
require('es6-promise').polyfill();
require('isomorphic-fetch');
```
