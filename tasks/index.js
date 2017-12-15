module.exports = {

  'browser-sync': [require('./browser-sync')],
  'clean': [require('./clean')],

  'build:hbs': [require('./build/hbs')],
  'build:scss': [require('./build/scss')],
  'build:static': [require('./build/static')],
  'build': [
    ['build:hbs', 'build:scss', 'build:static']
  ],

  'watch': [require('./watch')],
  'serve': [
    ['browser-sync', 'watch']
  ],
  'default': [
    ['build', 'serve']
  ]

}
