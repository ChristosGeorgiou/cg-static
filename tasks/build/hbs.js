const gulp = require('gulp')
const config = require('../../config')
const bs = require('browser-sync').get('SIM')
const fs = require('fs')
const handlebars = require('gulp-compile-handlebars')
const data = require('gulp-data')
const path = require('path')
const extend = require('extend')
const gutil = require('gulp-util')
const rename = require('gulp-rename')

function buildPages (lang, dest) {
  return new Promise(function (resolve, reject) {
    gutil.log('Building language', gutil.colors.magenta(dest))
    let _base = loadDataFile('_base', lang)
    gulp.src([path.join(config.dirs.src, 'pages/**/*.hbs')])
      .pipe(data(function (file) {
        let _page = path.relative(file.base, file.path).replace('.hbs', '')
        gutil.log('  >', gutil.colors.magenta(_page))
        let _content = loadDataFile(_page, lang)
        _content._page = _page
        _content.language = lang
        // console.log(_content);
        return _content
      }))
      .pipe(handlebars({
        _global: config,
        _base: _base
      }, {
        batch: path.join(config.dirs.src, 'partials'),
        helpers: config.handlebars.helpers
      }).on('error', gutil.log))
      .pipe(rename({
        extname: '.html'
      }))
      .pipe(gulp.dest(path.join(config.dirs.dist, (dest === 'default') ? '' : dest)))
      .on('end', function () {
        resolve()
      })
  })
}

function loadDataFile (filename, lang) {
  let fileBase = path.join(config.dirs.src, 'data', `${filename}.json`)
  if (!fs.existsSync(fileBase)) return {}
  let fileBaseDataRaw = fs.readFileSync(fileBase)
  let fileBaseData = JSON.parse(fileBaseDataRaw, {
    encoding: 'UTF-8'
  })

  let fileLang = path.join(config.dirs.src, 'data', `${filename}.${lang}.json`)
  if (lang && fs.existsSync(fileLang)) {
    let fileLangDataRaw = fs.readFileSync(fileLang)
    let fileLangData = JSON.parse(fileLangDataRaw, {
      encoding: 'UTF-8'
    })
    fileBaseData = extend(true, fileBaseData, fileLangData)
  }
  return fileBaseData
}

module.exports = function (cb) {
  if (!config.languages.length) {
    config.languages = ['en']
  }

  let _langs = extend([], config.languages)

  _langs.reduce(function (chain, lang) {
    return chain.then(buildPages.bind(null, lang, lang))
  }, buildPages(_langs[0], 'default')).then(function () {
    bs.reload()
    cb()
  })
}
