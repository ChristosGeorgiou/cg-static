const config = require('../../utils/config.service').config
const cpx = require('cpx')

module.exports = (cb) => {
  let len = config.files.length
  for (let i = 0; i < len; i++) {
    //console.log(`copy ${config.files[i].source} to ${config.files[i].destination}`)
    cpx.copy(config.files[i].source, config.files[i].destination)
  }
  cb()
}
