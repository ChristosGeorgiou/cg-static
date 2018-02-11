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
        console.log('creating dir: ' + dst)
        fs.mkdirSync(dst)
      } catch (e) {
        console.log('directory already exists: ' + dst)
      }
      results = results.concat(copy(src, dst))
    } else {
      try {
        console.log('copying file: ' + dst)
        fs.writeFileSync(dst, fs.readFileSync(src))
      } catch (e) {
        console.log('could\'t copy file: ' + dst)
      }
      results.push(src)
    }
  })
  return results
}
module.exports = function () {
  if (!config.dirs.statics) {
    return
  }

  let len = config.dirs.statics.length

  for (let i = 0; i < len; i++) {
    const pack = config.dirs.statics[i]
    copy(pack.files, pack.destination)
  }
}
