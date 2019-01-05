const gulp = require('gulp')
const config = require('../utils/config.service').config
const browserSync = require('browser-sync')
const path = require('path')

module.exports = () => {
  const bs = browserSync.get('SIM')
  gulp.watch([
    path.join(config.scss, '**/*.scss')
  ], gulp.series('build:scss'))

  gulp.watch(config.files.map((file) => {
    return file.source
  }), gulp.series('build:files'))

  gulp.watch([
    path.join(config.data, '**/*.json'),
    path.join(config.pages, '**/*.hbs'),
    path.join(config.helpers, '**/*.js'),
    path.join(config.partials, '**/*.hbs')
  ], gulp.series('build:hbs'))
    .on('change', bs.reload)
}
