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
    handlebars: {
        helpers: {
            json: require("./test/src/helpers/json"),
        }
    }
});