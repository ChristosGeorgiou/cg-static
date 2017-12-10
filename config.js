const extend = require('extend')
const fs = require('fs')
const path = require('path')
const gutil = require('gulp-util')
const argv = require('yargs').argv;

function getDirectories(path) {
  return fs.readdirSync(path)
    .filter(function (file) {
      return fs.statSync(path + '/' + file).isDirectory();
    });
}

module.exports = (function () {

  let defaultConfig = {
    languages: ['en'],
    dirs: {
      dist: './dist',
      src: './src',
      scss: './src/scss',
      statics: [{
        files: "./src/static/**/*",
        destination: "./dist"
      }]
    },
    handlebars: {
      helpers: {}
    }
  }

  let projects = getDirectories("./sites")

  // console.log("projects", projects)
  if (argv.project === undefined) {
    console.log(gutil.colors.red(`
      No project where defined
      Please use param --project <project-name>
      e.g. gulp build --project ${projects[0]}`))
    process.exit()
  }

  let customConfig = path.resolve(`./sites/${argv.project}/website.config.json`)
  let projectConfig = fs.existsSync(customConfig) ? require(customConfig) : {}

  let config = extend(defaultConfig, projectConfig, {
    project: argv.project,
  })

  config.dirs.dist = `./sites/${argv.project}/${config.dirs.dist}`
  config.dirs.src = `./sites/${argv.project}/${config.dirs.src}`
  config.dirs.scss = `./sites/${argv.project}/${config.dirs.scss}`

  if (config.dirs.statics.length) {
    config.dirs.statics.forEach(element => {
      element.files = `./sites/${argv.project}/${element.files}`
      element.destination = `./sites/${argv.project}/${element.destination}`
    });
  }

  console.log("CONFIG", config)

  return config

})()