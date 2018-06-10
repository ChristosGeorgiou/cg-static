const gulp = require('gulp')
const pkg = require('./package.json')

require('../')(gulp, {
  name: pkg.name,
  version: pkg.version
})
