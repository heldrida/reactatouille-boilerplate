import express from 'express'
import path from 'path'
import superagent from 'superagent'
import chalk from 'chalk'

const app = express()
const router = express.Router()
const port = process.env.PORT ? process.env.PORT : 3000
var serverInstance = null
var dist = path.join(__dirname, ('dist' + (process.env.NODE_ENV ? '/' + process.env.NODE_ENV : 'staging')))
var config = null

/**
 * Environment settings
 */
if (['staging', 'production'].indexOf(process.env.NODE_ENV) > -1) {
  dist = path.resolve(__dirname, process.env.NODE_ENV)
  config = require('../config')
} else {
  config = require('./config')
}

/**
 * Process error handling
 */
process.on('uncaughtException', (err) => {
  throw err
})

process.on('SIGINT', () => {
  serverInstance.close()
  process.exit(0)
})

/**
 * The Cross origin resource sharing rules
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

/**
 * Health check
 */
app.use('/healthcheck', (req, res) => {
  res.json({
    'env': {
      'NODE_ENV': process.env.NODE_ENV
    }
  })
  res.end()
})

router.use('/api/test', (req, res) => {
  superagent
    .get('https://jsonip.com/')
    .end((err, response) => {
      if (err) {
        console.log('api test err', err)
      }
      res.send(response.body)
    })
})

// HMR only in development
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
  console.log('Development environment: Starting webPack middleware...')

  const webpack = require('webpack')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackDevConfig = require('./webpack.dev.config')
  const compiler = webpack(webpackDevConfig)
  const _ = require('lodash')

  var webpackDevMiddleware = require('webpack-dev-middleware')
  var devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      version: true,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    }
  })

  router.use(devMiddleware)

  router.use(webpackHotMiddleware(compiler, {
    log: console.log
  }))

  router.use((req, res, next) => {
    const reqPath = req.url
    // find the file that the browser is looking for
    const file = _.last(reqPath.split('/'))
    if ([webpackDevConfig.output.filename, 'index.html'].indexOf(file) !== -1) {
      res.end(devMiddleware.fileSystem.readFileSync(path.join(webpackDevConfig.output.path, file)))
    } else if (file.indexOf('.') === -1) {
      // if the url does not have an extension, assume they've navigated to something like /home and want index.html
      res.end(devMiddleware.fileSystem.readFileSync(path.join(webpackDevConfig.output.path, 'index.html')))
    } else {
      next()
    }
  })
} else {
  // Production needs physical files! (built via separate process)
  router.use('/assets', express.static(dist))

  // any other is mapped here
  router.get('*', (req, res, next) => {
    // Catch-all route after the ones you want to exclude like the example before '/'
    // or exclude it here (this has the advantage of ordering however you'd like)
    if (req.url === '/foo' || req.url === '/bar') {
      return next()
    };
    res.sendFile(path.join(dist, 'index.html'))
  })
}

app.disable('x-powered-by')

app.use('/', router)

serverInstance = app.listen(port, (error) => {
  if (error) {
    console.log(error) // eslint-disable-line no-console
  }
  console.log(chalk.green('[' + config.build_name + '] listening on port ' + port + '!'))
})
