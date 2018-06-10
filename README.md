# Gulp Toolkit v3

A collection of gulp-tasks for static website build automation.


**Multi project support feature is dropped at v3**

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
  - `gulp build:pages` build handlebars templates
  - `gulp build:styles` build sass files
  - `gulp build:files` copy all contents of the files folder in dist root

## Credits

File stracture and some tasks are inspired or copied from [gulp-wp-toolkit](https://github.com/craigsimps/gulp-wp-toolkit)

## License

MIT License

Copyright (c) 2018 Christos Georgiou

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
