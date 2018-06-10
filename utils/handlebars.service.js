const gutil = require('gulp-util')
const hb = require('gulp-compile-handlebars')
const path = require('path')
var glob = require('glob')
const hbHelpers = require('handlebars-helpers')()

const config = require('../utils/config.service').config

function setup () {
  const extraHelpers = loadExtras()
  console.log(extraHelpers)
  const helpers = Object.assign({}, extraHelpers, hbHelpers)
  Object.keys(helpers).forEach((h) => {
    hb.Handlebars.registerHelper(h, helpers[h])
  })
  gutil.log('Loaded', gutil.colors.green(Object.keys(hbHelpers).length), 'default',
    'and', gutil.colors.green(Object.keys(extraHelpers).length), 'custom handlebars helpers')
}

function loadExtras () {
  const files = glob.sync(path.join(config.helpers, '**/*.js'))
  return files.reduce((o, f) => {
    o[path.basename(f, '.js')] = require(path.join(process.cwd(), f))
    return o
  }, {})
}

module.exports = {
  hb: hb,
  setup: setup
}
