var gulp = require('gulp');

require('./src/cg-static')(gulp, {
    language: "en",
    languages: [
        "en", "el"
    ],
    dirs: {
        dist: "./test/dist",
        src: "./test/src",
        scss: "./test/scss",
    },
    statics: [{
        destination: "./test/dist",
        files: [
            "./test/src/static/**/*.*"
        ],
    }, {
        destination: "./test/dist/modules",
        files: [
            "./README.md"
        ],
    }],
    handlebars: {
        helpers: {
            json: require("./test/src/helpers/json"),
        }
    }
});