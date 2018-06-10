module.exports = {

  'browser-sync': [require('./browser-sync')],
  'clean': [require('./clean')],
  'clear': [require('./clean')],

  'build:pages': [require('./build/hbs')],
  'build:styles': [require('./build/scss')],
  'build:files': [require('./build/files')],
  'build': [
    ['build:pages', 'build:styles', 'build:files']
  ],

  'watch': [require('./watch')],
  'serve': [
    ['browser-sync', 'watch']
  ],
  'default': [
    ['build', 'serve']
  ]

}
