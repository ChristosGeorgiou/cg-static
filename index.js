const bs = require('browser-sync')
const gutil = require('gulp-util')

const tasks = require('./tasks')
const configService = require('./utils/config.service')
const hbService = require('./utils/handlebars.service')

module.exports = (gulp, config) => {
  configService.set(config)
  gutil.log('Start toolkit with config', gutil.colors.magenta(JSON.stringify(configService.config)))
  hbService.setup()

  gutil.log('Load', gutil.colors.green(Object.keys(tasks).length), 'gulp tasks', gutil.colors.magenta(JSON.stringify(Object.keys(tasks))))
  Object.keys(tasks)
    .forEach(function (taskName) {
      const args = [taskName].concat(tasks[taskName])
      gulp.task.apply(gulp, args)
    })

  return {
    bs: bs
  }
}
