const config = require('../../utils/config.service').config
const cpx = require('cpx')

module.exports = () => {
  let len = config.files.length
  for (let i = 0; i < len; i++) {
    cpx.copy(config.files[i].source, config.files[i].destination)
  }
}
