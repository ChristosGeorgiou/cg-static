const config = require('../config')
const bs = require('browser-sync').create('SIM')

module.exports = function () {
  bs.init({
    server: config.dirs.dist,
    notify: false,
    reloadOnRestart: true,
    open: false,
    online: false,
    logLevel: 'info',
    ui: false
  })
}
