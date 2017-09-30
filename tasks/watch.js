const gulp = require('gulp')
const config = require('../config')
const bs = require('browser-sync').get('SIM')
const path = require('path')

module.exports = function () {
  gulp.watch([path.join(config.dirs.scss, '**/*.scss')], ['scss'])
  gulp.watch([
    path.join(config.dirs.src, 'data/**/*.json'),
    path.join(config.dirs.src, '**/*.hbs')
  ], ['build:hbs'])
  gulp.watch([
    path.join(config.dirs.scss, '**/*.scss'),
    path.join(config.dirs.src, 'data/**/*.json'),
    path.join(config.dirs.src, '**/*.hbs')
  ]).on('change', bs.reload)
}
