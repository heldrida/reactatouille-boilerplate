const config = require('config')
const express = require('express')
const path = require('path')
const app = express()
const chalk = require('chalk')
const port = process.env.PORT ? process.env.PORT : config.defaultPort
const rootDir = path.resolve(__dirname, '../../../')
const dist = path.join(rootDir, ('dist' + (process.env.NODE_ENV ? '/' + process.env.NODE_ENV : null)))
const React = require('react')
const renderToString = require('react-dom/server').renderToString
const StaticRouter = require('react-router').StaticRouter
const Provider = require('react-redux').Provider
const configureStore = require(rootDir + '/dist/production/lib/root/store').default
const App = require(rootDir + '/dist/production/lib/modules/main/containers/App').default
const Routes = require(rootDir + '/dist/production/lib/root/routes').default
const webpackAssets = require('../../../config/webpack-assets.json')
const mainModuleChildRoutes = Routes[0].routes
let serverInstance

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.setHeader('Expires', '-1')
  res.setHeader('Pragma', 'no-cache')
  next()
})

app.disable('x-powered-by')

console.log('test aa2223233')

process.on('uncaughtException', function (err) {
  throw err
})

process.on('SIGINT', function () {
  serverInstance.close()
  process.exit(0)
})

app.set('views', path.join(rootDir, 'src'))
app.set('view engine', 'ejs')

app.use('/assets', express.static(path.join(dist, '/assets')))

app.get('*', (req, res) => {
  const isRoute = mainModuleChildRoutes.find(route => route.path === req.url)
  if (!isRoute) {
    // TODO: Show a 404 Component
    res.status(404).send('Not found')
  } else {
    // TODO: create async configureStore serverSideVersion and await
    const preloadedState = {}
    // Create a new Redux store instance
    const store = configureStore(preloadedState)
      // Render the component to a string
    const mainHtml = renderToString(React.createElement(
      StaticRouter,
      { context: {}, location: req.url },
      React.createElement(
        Provider,
        { store: store },
        React.createElement(App, {routes: mainModuleChildRoutes})
      )
    ))
    // Grab the initial state from our Redux store
    const stateJson = JSON.stringify(store.getState())
    res.render('index', {
      app: mainHtml,
      state: stateJson,
      bundle: webpackAssets.main.js,
      vendors: 'assets/js/vendors.dll.js',
      build: config.buildName,
      css: '/assets/css/main.min.css'
    })
  }
})

serverInstance = app.listen(port, (error) => {
  if (error) {
    console.log(error)
    serverInstance.close()
    process.exit(0)
  }
  console.log(chalk.green('[' + config.buildName + '] listening on port ' + port + '!'))
})
