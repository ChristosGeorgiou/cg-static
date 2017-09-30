const gulp = require('gulp')
const config = require('../../config')
const bs = require('browser-sync').get('SIM')
const minify = require('gulp-clean-css')
const path = require('path')
const rename = require('gulp-rename')
const sass = require('gulp-sass')

module.exports = function () {
  return gulp
    .src(path.join(config.dirs.scss, '**/*.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(config.dirs.dist, 'css')))
    .pipe(minify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(config.dirs.dist, 'css')))
    .pipe(bs.stream())
}
