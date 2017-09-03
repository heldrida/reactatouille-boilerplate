import React from 'react'
import { render } from 'react-dom'
import { AppContainer as HotReload } from 'react-hot-loader'
import Root from './root'
import configureStore from './root/store'
import { default as appConfig } from 'config'

console.log('[debug app config]', appConfig)

const store = configureStore()

// render method for instantiation and Hot module reload
const renderApp = (RootComponent, store) => {
  let rootEl = document.getElementById('app')
  render(
    <HotReload>
      <RootComponent store={store} />
    </HotReload>,
    rootEl
  )
}

// create instance
renderApp(Root, store)

// Hot Module Replacement API
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').default
    // (re)render, the updated app
    renderApp(NextRoot, store)
  })
}

if (['staging', 'production'].includes(process.env.NODE_ENV)) {
  require('offline-plugin/runtime').install()
}
