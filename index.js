const gutil = require('gulp-util')

const configService = require('./utils/config.service')
const hbService = require('./utils/handlebars.service')

module.exports = (gulp, config) => {
  configService.set(config)
  gutil.log('Start toolkit with config', gutil.colors.magenta(JSON.stringify(configService.config)))
  hbService.setup()

  gulp.task('bs', require('./tasks/bs'))
  gulp.task('clean', require('./tasks/clean'))
  gulp.task('build:hbs', require('./tasks/build/hbs'))
  gulp.task('build:scss', require('./tasks/build/scss'))
  gulp.task('build:files', require('./tasks/build/files'))
  gulp.task('build', gulp.parallel(
    'build:hbs',
    'build:scss',
    'build:files'))

  gulp.task('watch', require('./tasks/watch'))
  gulp.task('serve', gulp.parallel(
    'bs', 'watch'
  ))

  gulp.task('default', gulp.parallel(
    'build', 'serve'
  ))
}
