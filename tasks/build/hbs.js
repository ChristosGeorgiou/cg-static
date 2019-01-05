const gulp = require('gulp')
const fs = require('fs')
const data = require('gulp-data')
const path = require('path')
const extend = require('extend')
const gutil = require('gulp-util')
const rename = require('gulp-rename')

const config = require('../../utils/config.service').config
const hbService = require('../../utils/handlebars.service')

function buildPages (lang, dest) {
  return new Promise(function (resolve, reject) {
    let _base = loadDataFile('_base', lang)
    gulp.src([path.join(config.pages, '**/*.hbs')])
      .pipe(data(function (file) {
        let _page = path.relative(file.base, file.path).replace('.hbs', '')
        gutil.log('Build page', gutil.colors.magenta(dest, ':', _page))
        let _content = loadDataFile(_page, lang)
        _content._page = _page
        _content.language = lang
        return _content
      }))
      .pipe(hbService.hb({
        _name: config.name || '???no-name???',
        _version: config.version || '???no-version???',
        _base: _base
      }, {
        batch: config.partials
      }).on('error', (err) => {
        gutil.log(err)
        reject(err)
      }))
      .pipe(rename({
        extname: '.html'
      }))
      .pipe(gulp.dest(path.join(config.dist, (dest === 'default') ? '' : dest)))
      .on('end', function () {
        resolve()
      })
  })
}

function loadDataFile (filename, lang) {
  let fileBase = path.join(config.data, `${filename}.json`)
  if (!fs.existsSync(fileBase)) return {}
  let fileBaseDataRaw = fs.readFileSync(fileBase)
  let fileBaseData = JSON.parse(fileBaseDataRaw, {
    encoding: 'UTF-8'
  })

  let fileLang = path.join(config.data, `${filename}.${lang}.json`)
  if (lang && fs.existsSync(fileLang)) {
    let fileLangDataRaw = fs.readFileSync(fileLang)
    let fileLangData = JSON.parse(fileLangDataRaw, {
      encoding: 'UTF-8'
    })
    fileBaseData = extend(true, fileBaseData, fileLangData)
  }
  return fileBaseData
}

module.exports = (cb) => {
  config.languages.reduce(function (chain, lang) {
    return chain.then(buildPages.bind(null, lang, lang))
  }, buildPages(config.languages[0], 'default')).then(() => {
    cb()
  })
}
