const bs = require('browser-sync')
const gutil = require('gulp-util')

const tasks = require('./tasks')
const extendTasks = require('./utils/extend-tasks')
const configService = require('./utils/config.service')
const hbService = require('./utils/handlebars.service')

module.exports = (gulp, config) => {
  configService.set(config)
  gutil.log('Start toolkit with config', gutil.colors.magenta(JSON.stringify(configService.config)))
  hbService.setup()
  extendTasks(gulp, tasks)
  return {
    bs: bs
  }
}
