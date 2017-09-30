const gulp = require('gulp')
const config = require('../config')
const clean = require('gulp-clean')

module.exports = function () {
  return gulp
    .src(config.dirs.dist, {
      read: false
    })
    .pipe(clean())
}
