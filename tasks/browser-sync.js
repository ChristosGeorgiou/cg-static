const config = require('../utils/config.service').config
const bs = require('browser-sync').create('SIM')

module.exports = () => {
  bs.init({
    server: config.dist,
    notify: false,
    reloadOnRestart: true,
    open: false,
    online: false,
    logLevel: 'info',
    ui: false
  })
}
