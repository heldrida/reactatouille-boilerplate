import express from 'express'
import path from 'path'
import superagent from 'superagent'
import chalk from 'chalk'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './src/js/routes'

import configureStore from './src/js/store'

const app = express()
const port = process.env.PORT ? process.env.PORT : 3000
var serverInstance = null
var dist = path.join(__dirname, ('dist/production'))
var config = null
var fs = require('fs')
var htmlTemplateString = ''

const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevConfig = require('./webpack.dev.config')
const compiler = webpack(require('./webpack.dev.config'))
var webpackDevMiddleware = require('webpack-dev-middleware')

config = require('./config')
htmlTemplateString = fs.readFileSync('./dist/production/index.html', 'utf-8')

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

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackDevConfig.output.publicPath,
  stats: {
    colors: true
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

// any other is mapped here
app.get('*', (req, res, next) => {
  match({ routes: routes, location: req.url }, (error, redirectLocation, props) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (props) {
      const preloadedState = {'foobar': 1}
            // Create a new Redux store instance
      const store = configureStore(preloadedState)
            // Render the component to a string
      const myAppHtml = renderToString(<RouterContext {...props} />)

            // Grab the initial state from our Redux store
      const finalState = store.getState()
            // Send the rendered page back to the client
      let html = htmlTemplateString.replace('<div id="app">', '<div id="app">' + myAppHtml)

            // Paste the state into the html
      const preloadedStateScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, '\\x3c')}</script>`
      html = html.replace('</head>', preloadedStateScript)
      // res.status(200).send(html)
      // res.end(devMiddleware.fileSystem.readFileSync(path.join(webpackDevConfig.output.path, 'index.html')))
      // res.status(200).send(html)
      res.status(200).send(renderFullPage(myAppHtml, preloadedState))
    } else {
      res.status(404).send('Not found')
    }
  })
})

function renderFullPage (html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/assets/js/bundle.js"></script>
      </body>
    </html>
    `
}

serverInstance = app.listen(port, (error) => {
  if (error) {
    console.log(error) // eslint-disable-line no-console
  }
  console.log(chalk.green('[' + config.build_name + '] listening on port ' + port + '!'))
})
