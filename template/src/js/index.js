import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer as HotReload } from 'react-hot-loader'
import configureStore from './store'
import routes from './routes'
import Root from './root'

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store)

render(
  <HotReload>
    <Root store={store} history={history} routes={routes} />
  </HotReload>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default
    render(
      <HotReload>
        <Root store={store} history={history} routes={newRoutes} />
      </HotReload>,
      document.getElementById('app')
    )
  })

  /**
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
  const orgError = console.error // eslint-disable-line no-console
  console.error = (...args) => { // eslint-disable-line no-console
    if (args && args.length === 1 && typeof args[0] === 'string' && args[0].indexOf('You cannot change <Router routes>;') > -1) {
        // React route changed
    } else {
        // Log the error as normally
      orgError.apply(console, args)
    }
  }
}
