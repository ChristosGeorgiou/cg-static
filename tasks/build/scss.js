const gulp = require('gulp')
const config = require('../../utils/config.service').config
const browserSync = require('browser-sync')
const minify = require('gulp-clean-css')
const path = require('path')
const rename = require('gulp-rename')
const sass = require('gulp-sass')

module.exports = () => {
  const bs = browserSync.get('SIM')
  gulp
    .src(path.join(config.scss, '**/*.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(config.dist, 'css')))
    .pipe(minify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(config.dist, 'css')))
    .pipe(bs.stream())
}
