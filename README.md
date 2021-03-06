# GrecTravel

Find the fastest flights in the world and the most luxurious hotels. Cheap prices and professional support.

:computer: [Live preview](https://grectraveling.grec.dev/)

### To properly run the website on your local machine:

**Installing:**

1. Assuming you have [`git`](https://git-scm.com/downloads) installed type in console: `git clone https://github.com/grecdev/GrecTraveling.git`

2. Make sure you have the latest version of [Node.js](https://nodejs.org/en/download/)

3. [node package manager](https://docs.npmjs.com/about-npm/), run the following command in the `CLI` (command line interface):

```
npm install -g npm@latest
```

4. Install all `dependencies / modules`, run the following command in the `CLI` (command line interface):

```
npm install
```

**To browse the website**:

1. `npm start` - To run development server on your local machine ( `localhost` )

2. `npm run build` - To get all production files

### I used the following technologies for this project:

- HTML5
- CSS 3 with [Sass](https://sass-lang.com/)
- Media Queries ( Responsive Design )
- React.js
- [Webpack](https://github.com/webpack/webpack)
- For `version control system` i used [Git](https://git-scm.com/)
- npm

### Features for this website:

1. [Smooth Scroll](http://callmecavs.com/jump.js/)
2. Form regex validation
3. Home page interactive slideshow gallery
4. Single Page Application
5. For state management i used: `context api` + `class component state` / `functional component state hook`
6. [Code splitting](https://reactjs.org/docs/code-splitting.html) with lazy() and Suspense
7. For my flights / hotels "database" i used a `json` file hosted with github pages
8. For the hotel room page i created an `infinite slideshow gallery`
9. Filter functionality for flights and hotels
10. [Date picker](https://dev.to/knheidorn/making-a-calendar-in-vanilla-javascript-48j8) and adapted to my needs

For `api data` fetching i used:

```
XMLHttpRequest()
Fetch api
Async / await
```

### :bowtie: Contribuitors:

Grecu Alexandru aka [`grecdev`](https://github.com/grecdev)

### License:

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/grecdev/GrecTraveling-Portfolio/blob/master/LICENSE.md) file for details

**_Additional information:_**

:iphone: Check for `responsive design` in chrome:

1. Open `developer console` pressing `F12`
2. Click on the `Toggle Device Toolbar` button or press `Ctrl + Shift + M`

(make sure you `refresh` the page each time you change the mobile device)

You can check for website performance with `google audit` (it checks for individual page):

1. Open an `incognito tab`. ( Disables extenstions, and it works better )

- Windows | Linux, | Chrome OS: `Press Ctrl + Shift + n`.
- Mac: `Press ⌘ + Shift + n`.

2. Open `developer console` pressing `F12`
3. Select `Audits` tab
4. Press `Run audits` blue button on the bottom of the tab

To search flights / hotels check more instructions on the flights / hotels page
