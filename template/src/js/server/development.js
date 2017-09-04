import express from 'express'
import path from 'path'
// import superagent from 'superagent'
import axios from 'axios'
import chalk from 'chalk'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import configureStore from '../root/store'
import { Provider } from 'react-redux'

import App from '../modules/main/containers/App'

import Routes from '../root/routes'

const mainModuleChildRoutes = Routes[0].routes
const app = express()
const port = process.env.PORT ? process.env.PORT : 3000
var serverInstance = null
var rootDir = path.resolve(__dirname, '../../../')
var dist = path.join(rootDir, 'dist/' + process.env.NODE_ENV)
var config = null
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevConfig = require('../../../config/webpack.dev.config')
const compiler = webpack(require('../../../config/webpack.dev.config'))
var webpackDevMiddleware = require('webpack-dev-middleware')
const webpackAssets = require('../../../config/webpack-assets.json')

config = require('config')

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

app.set('views', path.join(rootDir, 'src'))
app.set('view engine', 'ejs')

app.use(webpackDevMiddleware(compiler, {
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
}))

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}))

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

app.use('/api/test', (req, res) => {
  const URL = 'https://jsonip.com/'
  axios({
    method: 'get',
    url: URL,
    responseType: 'json'
  })
  .then((response) => res.send(response.data))
})

app.use('/assets', express.static(dist))

app.get('*', (req, res) => {
  const isRoute = mainModuleChildRoutes.find(route => route.path === req.url)
  if (!isRoute) {
    res.status(404).send('Not found')
  } else {
    const preloadedState = {'foobar': 1}
      // Create a new Redux store instance
    const store = configureStore(preloadedState)
      // Render the component to a string
    const mainHtml = renderToString(<StaticRouter context={{}} location={req.url}>
      <Provider store={store}>
        <App routes={mainModuleChildRoutes} />
      </Provider>
    </StaticRouter>)

    // Grab the initial state from our Redux store
    const finalState = store.getState()
    res.render('index', {
      app: mainHtml,
      state: JSON.stringify(finalState).replace(/</g, '\\x3c'),
      bundle: webpackAssets.main.js,
      vendors: 'assets/js/vendors.dll.js',
      build: config.buildName,
      css: '/assets/css/main.min.css'
    })
  }
})

serverInstance = app.listen(port, (error) => {
  if (error) {
    console.log(error) // eslint-disable-line no-console
  }
  console.log(chalk.green('[' + config.buildName + '] listening on port ' + port + '!'))
})
