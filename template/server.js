if (['staging', 'production'].indexOf(process.env.NODE_ENV) > -1) {
  require('./src/js/server/production.js')
} else {
  require('babel-register')
  require('./src/js/server/development.js')
}
