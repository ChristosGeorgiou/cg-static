const gutil = require('gulp-util')

module.exports = (gulp, tasks) => {
  gutil.log('Load', gutil.colors.green(Object.keys(tasks).length), 'gulp tasks', gutil.colors.magenta(JSON.stringify(Object.keys(tasks))))
  Object.keys(tasks)
    .forEach(function (taskName) {
      const args = [taskName].concat(tasks[taskName])
      gulp.task.apply(gulp, args)
    })
}
