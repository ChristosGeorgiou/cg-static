const extend = require('extend')
const fs = require('fs')
const path = require('path')
const argv = require('yargs').argv

module.exports = (function () {
  let defaultConfig = {
    languages: ['en'],
    dirs: {
      root: './',
      dist: './dist',
      src: './src',
      scss: './src/scss',
      statics: [{
        source: './src/static/**/*',
        destination: './dist/'
      }]
    },
    handlebars: {
      helpers: {}
    }
  }

  if (argv.project !== undefined) {
    defaultConfig.dirs.root = `./sites/${argv.project}`
  }

  let customConfig = path.resolve(`./${defaultConfig.dirs.root}/website.config.json`)
  let projectConfig = fs.existsSync(customConfig) ? require(customConfig) : {}

  let config = extend(defaultConfig, projectConfig, {
    project: argv.project
  })

  if (argv.project !== undefined) {
    config.dirs.dist = path.join(config.dirs.root, config.dirs.dist)
    config.dirs.src = path.join(config.dirs.root, config.dirs.src)
    config.dirs.scss = path.join(config.dirs.root, config.dirs.scss)
  }

  if (config.dirs.statics.length) {
    config.dirs.statics.forEach(element => {
      element.source = path.join(config.dirs.root, element.source)
      element.destination = path.join(config.dirs.root, element.destination)
    })
  }

  return config
})()
