if (['staging', 'production'].indexOf(process.env.NODE_ENV) > -1) {
  require('./dist/' + process.env.NODE_ENV + '/server.js')
} else {
  require('babel-register')
  require('./server.dev.js')
}
