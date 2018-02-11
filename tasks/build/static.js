const fs = require('fs')
const config = require('../../config')

function copy (srcDir, dstDir) {
  var results = []
  var list = fs.readdirSync(srcDir)
  var src, dst
  list.forEach(function (file) {
    src = srcDir + '/' + file
    dst = dstDir + '/' + file
    var stat = fs.statSync(src)
    if (stat && stat.isDirectory()) {
      try {
        fs.mkdirSync(dst)
      } catch (e) {}
      results = results.concat(copy(src, dst))
    } else {
      try {
        fs.writeFileSync(dst, fs.readFileSync(src))
      } catch (e) {}
      results.push(src)
    }
  })
  return results
}
module.exports = function () {
  if (!config.dirs.statics) {
    return
  }

  if (!fs.existsSync(config.dirs.dist)) {
    fs.mkdirSync(config.dirs.dist)
  }

  let len = config.dirs.statics.length

  for (let i = 0; i < len; i++) {
    const pack = config.dirs.statics[i]
    copy(pack.files, pack.destination)
  }
}
