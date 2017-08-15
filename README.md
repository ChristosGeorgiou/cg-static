# CG Static
A collection of gulp tasks to automate build of static sites

# Usage

```` js
var gulp = require('gulp');
require('cg-static')(gulp, {
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
}
````

# Functions

**serve:** serve using browser-sync

**build:** run handlebars scss and static

**clean:** clean dist folder - all file will be deleted

**handlebars:** build handlebars templates

**scss:** build sass files

**static:** copy all contents of the static folder in dist root


# License
The MIT License (MIT)