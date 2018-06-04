const fs = require('fs')
const config = require('../../config')
const cpx = require('cpx')

module.exports = function () {
  if (!config.dirs.statics) {
    return
  }

  if (!fs.existsSync(config.dirs.dist)) {
    fs.mkdirSync(config.dirs.dist)
  }

  let len = config.dirs.statics.length

  for (let i = 0; i < len; i++) {
    cpx.copy(config.dirs.statics[i].source, config.dirs.statics[i].destination)
  }
}
