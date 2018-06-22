const gulp = require('gulp')
const config = require('../utils/config.service').config
const bs = require('browser-sync').get('SIM')
const path = require('path')

module.exports = () => {
  gulp.watch([
    path.join(config.scss, '**/*.scss')
  ], ['build:scss'])
  gulp.watch(config.files.map((file) => {
    return file.source
  }), ['build:files'])
  gulp.watch([
    path.join(config.data, '**/*.json'),
    path.join(config.pages, '**/*.hbs'),
    path.join(config.helpers, '**/*.js'),
    path.join(config.partials, '**/*.hbs')
  ], ['build:pages']).on('change', bs.reload)
}
