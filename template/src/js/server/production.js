var serverInstance = null,
  config = require('../../../config/app'),
  express = require('express'),
  path = require('path'),
  app = express(),
  chalk = require('chalk'),
  port = process.env.PORT ? process.env.PORT : config.defaultPort,
  rootDir = path.resolve(__dirname, '../../../'),
  dist = path.join(rootDir, ('dist' + (process.env.NODE_ENV ? '/' + process.env.NODE_ENV : null)))

console.log('dist', dist)

app.use(function (req, res, next) {
    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.setHeader('Expires', '-1')
  res.setHeader('Pragma', 'no-cache')

  next()
})

app.disable('x-powered-by')

app.use(express.static(dist))

/**
 * Healthcheck
 */
app.use('/health', function (req, res) {
  res.json({
    'UP': true,
    'env': {
      'NODE_ENV': process.env.NODE_ENV
    },
    'build_name': config.build_name
  })
  // Close the response
  res.end()
})

process.on('uncaughtException', function (err) {
  throw err
})

process.on('SIGINT', function () {
  serverInstance.close()
  process.exit(0)
})

app.get('*', function (req, res) {
  res.sendFile(path.join(dist, 'index.html'))
})

serverInstance = app.listen(port, (error) => {
  if (error) {
    console.log(error) // eslint-disable-line no-console
  }
  console.log(chalk.green('[' + config.build_name + '] listening on port ' + port + '!'))
})
