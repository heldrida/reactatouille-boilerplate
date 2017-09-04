var serverInstance = null,
  config = require('config'),
  express = require('express'),
  path = require('path'),
  app = express(),
  chalk = require('chalk'),
  port = process.env.PORT ? process.env.PORT : config.defaultPort,
  rootDir = path.resolve(__dirname, '../../../'),
  dist = path.join(rootDir, ('dist' + (process.env.NODE_ENV ? '/' + process.env.NODE_ENV : null))),
  React = require('react'),
  renderToString = require('react-dom/server').renderToString,
  StaticRouter = require('react-router').StaticRouter,
  Provider = require('react-redux').Provider,
  configureStore = require(rootDir + '/dist/production/lib/root/store').default,
  App = require(rootDir + '/dist/production/lib/modules/main/containers/App').default,
  Routes = require(rootDir + '/dist/production/lib/root/routes').default

const webpackAssets = require('../../../config/webpack-assets.json')
const mainModuleChildRoutes = Routes[0].routes

console.log('[DIRNAME ] >>>>>> ', __dirname)
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

process.on('uncaughtException', function (err) {
  throw err
})

process.on('SIGINT', function () {
  serverInstance.close()
  process.exit(0)
})

app.set('views', path.join(rootDir, 'src'))
app.set('view engine', 'ejs')

app.get('*', (req, res) => {
  console.log('~~~~ req.url: ', req.url)
  // const isRoute = mainModuleChildRoutes.find(route => route.path === req.url)
  if (false) {
    res.status(404).send('Not found')
  } else {
    const preloadedState = {'foobar': 1}
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

    // const mainHtml = renderToString(React.createFactory(App)({}))

    console.log('~~~~ mainHtml ~~~ >> ', mainHtml)

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

app.use('/assets', express.static(dist))

serverInstance = app.listen(port, (error) => {
  if (error) {
    console.log(error) // eslint-disable-line no-console
  }
  console.log(chalk.green('[' + config.buildName + '] listening on port ' + port + '!'))
})
