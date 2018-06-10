const gulp = require('gulp')
const pkg = require('./package.json')
const toolkit = require('../')(gulp, {
  name: pkg.name,
  version: pkg.version
})

toolkit.extendTasks(gulp, {
  testTask: (cb) => {
    console.log('test task run')
    cb()
  }
})
