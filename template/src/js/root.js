import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes'
import { renderRoutes } from 'react-router-config'

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        { renderRoutes(routes) }
      </Router>
    </Provider>
  )
}

export default Root
