import express from 'express'
import path from 'path'
import superagent from 'superagent'
import chalk from 'chalk'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import configureStore from './src/js/rootStore'
import { Provider } from 'react-redux'

import MyApp from './src/js/example/containers/app'

const app = express()
const port = process.env.PORT ? process.env.PORT : 3000
var serverInstance = null
var dist = path.join(__dirname, 'dist/' + process.env.NODE_ENV)
var config = null
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevConfig = require('./webpack.dev.config')
const compiler = webpack(require('./webpack.dev.config'))
var webpackDevMiddleware = require('webpack-dev-middleware')
const webpackAssets = require('./webpack-assets.json')

console.log('dist:', dist)

config = require('./config')

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

app.set('views', path.join(__dirname, 'src'))
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
  superagent
    .get('https://jsonip.com/')
    .end((err, response) => {
      if (err) {
        console.log('api test err', err)
      }
      res.send(response.body)
    })
})

app.use('/assets', express.static(dist))

app.get('*', (req, res) => {
  // (wip) migration to react-router v4 temporary solution
  // let matches
  // if (typeof routes.props.children !== 'undefined' && Array.isArray(routes.props.children)) {
  //   matches = routes.props.children.find((v) => {
  //     return v.props.path === req.url
  //   })
  // } else {
  //   matches = routes.props.children.props.path === req.url
  // }
  let matches = true
  if (!matches) {
    res.status(404).send('Not found')
  } else {
    const preloadedState = {'foobar': 1}
      // Create a new Redux store instance
    const store = configureStore(preloadedState)
      // Render the component to a string
    const myAppHtml = renderToString(<StaticRouter context={{}} location={req.url}>
      <Provider store={store}>
        <MyApp />
      </Provider>
    </StaticRouter>)
      // Grab the initial state from our Redux store
    const finalState = store.getState()
    res.render('index', {
      app: myAppHtml,
      state: JSON.stringify(finalState).replace(/</g, '\\x3c'),
      bundle: webpackAssets.main.js,
      build: config.build_name,
      css: '/assets/css/main.min.css'
    })
  }
})

serverInstance = app.listen(port, (error) => {
  if (error) {
    console.log(error) // eslint-disable-line no-console
  }
  console.log(chalk.green('[' + config.build_name + '] listening on port ' + port + '!'))
})
