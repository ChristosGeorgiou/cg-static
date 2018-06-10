const gulp = require('gulp')
const config = require('../utils/config.service').config
const clean = require('gulp-clean')

module.exports = () => {
  return gulp
    .src(config.dist, {
      read: false
    })
    .pipe(clean())
}
