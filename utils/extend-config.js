const extend = require('extend')
const defaultConfig = require('../config')

module.exports = function extendConfig (config) {
  extend(defaultConfig, config)
}
