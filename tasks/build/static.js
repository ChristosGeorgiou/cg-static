const gulp = require('gulp')
const path = require('path')
const config = require('../../config')
const merge = require('gulp-merge')

module.exports = function () {
  if (!config.dirs.statics) {
    return
  }

  config.dirs.statics.forEach(function (pack) {
    merge()
      .add(gulp
        .src(path.resolve(pack.files))
        .pipe(gulp.dest(pack.destination)))
  })
}
