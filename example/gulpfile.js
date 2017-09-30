const gulp = require('gulp')
const toolkit = require('../')

toolkit.extendConfig({
  languages: ['en'], // optional. array of all languages. the first is default
  dirs: {
    dist: './dist', // default-value
    src: './src', // default-value
    scss: './scss' // default-value
  },
  statics: [{ // example of simple static folder - glob is used
    destination: './test/dist',
    files: [
      './test/src/static/**/*.*'
    ]
  }],
  handlebars: {
    helpers: {
      json: require('./src/helpers/json')
            // require here handlebars plugins
    }
  }
})

toolkit.extendTasks(gulp, { /* Task Overrides */ })
