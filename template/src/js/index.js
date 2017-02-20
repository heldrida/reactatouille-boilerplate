import React from 'react'
import { render } from 'react-dom'
import { AppContainer as HotReload } from 'react-hot-loader'
import Root from './root'
import configureStore from './store'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store)

// render method for instantiation and Hot module reload
const renderApp = (RootComponent, store, history) => {
  let rootEl = document.getElementById('app')
  render(
    <HotReload>
      <RootComponent store={store} history={history} />
    </HotReload>,
    rootEl,
  )
}

// create instance
renderApp(Root, store, history)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').default
    // (re)render, the updated app
    renderApp(NextRoot, store, history)
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
