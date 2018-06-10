const defaultConfig = require('../config.json')

module.exports = {
  config: defaultConfig,
  set: (config) => {
    this.config = Object.assign(defaultConfig, config)
  }
}
