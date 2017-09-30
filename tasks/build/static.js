const gulp = require('gulp')
const config = require('../../config')
const merge = require('gulp-merge')

module.exports = function () {
  if (!config.statics) {
    return
  }

  config.statics.forEach(function (pack) {
    merge()
      .add(gulp
        .src(pack.files)
        .pipe(gulp.dest(pack.destination)))
  })
}
