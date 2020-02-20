# GrecTravel

Find the fastest flights in the world and the most luxurious hotels.

:computer: Live preview: [in progress]()

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

1. `npm start` - To run development server on your local machine (`localhost`)

2. `npm run build` - To get all production files

### I used the following technologies for this project:

- Semantic HTML5
- [Sass](https://sass-lang.com/) (with `.scss` extension / syntax, see more details [here](https://sass-lang.com/documentation/syntax))
- Media Queries ( Responsive Design )
- React.js
- [Jump.js](http://callmecavs.com/jump.js/) library for smooth scroll
- [Webpack](https://github.com/webpack/webpack)
- For `version control system` i used [Git](https://git-scm.com/)

### Features for this website:

1. Smooth Scroll
2. Form regex validation
3. Home page interactive slideshow gallery
4. Single Page Application
5. For state management i used: `context api` + `class component state` / `functional component state hook`
6. Code splitting with lazy() and Suspense
7. For my flights / hotels "database" i used a `json` file hosted with github pages
8. For the hotel room page i created an `infinite slideshow gallery`
9. Filter functionality for flights and hotels
10. Date picker (learned from [here](https://dev.to/knheidorn/making-a-calendar-in-vanilla-javascript-48j8) and adapted to my needs)

### :bowtie: Contribuitors:

Grecu Alexandru aka [`grecdev`](https://github.com/grecdev)

### License:

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/grecdev/FitnessClub-Gym-Portfolio/blob/master/LICENSE.md) file for details

***Additional information:***

:iphone: Check for `responsive design` in chrome: 

1. Open `developer console` pressing `F12`
2. Click on the `Toggle Device Toolbar` button or press `Ctrl + Shift + M`

- Optimised Images
- Basic SEO

You can check for website performance with `google audit` (it checks for individual page):

1. Open `developer console` pressing `F12`
2. Select `Audits` tab
3. Press `Run audits` blue button on the bottom of the tab

To search flights / hotels check more instructions on the flights / hotels page

If you see `not found` error on the home page ( on development files ) that's because i convert the jpg images to webp format, for better optimizations, and i get those images on production files

So better use `npm run build` and open the `index.html` file from there, or disable in `development` files the following: `src\assets\js\components\pages\home\showcase\SlideshowImage.js` and comment out `changeFormat()` function
