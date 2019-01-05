# Gulp Toolkit

A collection of gulp tasks for generate static sites.

Multi project support feature **is dropped at v3**

## Usage

```` bash
# install
npm i gulp-cg-toolkit
````

```` js
// simplest gulpfile.js
const gulp = require('gulp')
require('gulp-cg-toolkit')(gulp)

// gulpfile.js with custom config
const gulp = require('gulp')
const pkg = require('./package.json')
require('gulp-cg-toolkit')(gulp, {
  name: pkg.name,
  version: pkg.version,
  pages: "./src/my-pages",
  partials: "./src/may-partials",
})
````

## Default Configuration

````json
{
  "languages": ["en"],
  "dist": "./dist",
  "data": "./src/data",
  "pages": "./src/pages",
  "partials": "./src/partials",
  "helpers": "./src/helpers",
  "scss": "./src/scss",
  "files": [{
    "source": "./src/static/**/*",
    "destination": "./dist/"
  }]
}
````

## Functions

- `gulp serve` serve using browser-sync
- `gulp clean` clean dist folder, all files will be deleted
- `gulp build` run handlebars scss and static
  - `gulp build:hbs` build handlebars templates
  - `gulp build:scss` build scss files
  - `gulp build:files` copy all contents of the files folder in dist root

## Credits

File stracture and some tasks are inspired or copied from [gulp-wp-toolkit](https://github.com/craigsimps/gulp-wp-toolkit)

## License

MIT License