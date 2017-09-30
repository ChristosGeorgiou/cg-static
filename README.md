# Gulp CG Static

A collection of gulp tasks to automate build of static sites

## Credits

File stracture and some tasks are inspired or copied from [gulp-wp-toolkit](https://github.com/craigsimps/gulp-wp-toolkit)

## Usage

```` js
const gulp = require('gulp')
const toolkit = require('gulp-cg-toolkit')

toolkit.extendConfig({
    languages: ["en"], // optional. array of all languages. the first is default
    dirs: {
        dist: "./dist", //default-value
        src: "./src", //default-value
        scss: "./scss", //default-value
    },
    statics: [{ // example of simple static folder - glob is used
        destination: "./test/dist",
        files: [
            "./test/src/static/**/*.*"
        ],
    }],
    handlebars: {
        helpers: {
            json: require("./src/helpers/json"),
            // require here handlebars plugins
        }
    }
});

toolkit.extendTasks(gulp, { /* Task Overrides */ })
````

## Functions

- `gulp serve` serve using browser-sync
- `gulp clean` clean dist folder - all file will be deleted
- `gulp build` run handlebars scss and static
  - `gulp build:hbs` build handlebars templates
  - `gulp build:scss` build sass files
  - `gulp build:static` copy all contents of the static folder in dist root

## License

MIT License

Copyright (c) 2017 Christos Georgiou

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
