import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

const Root = ({store, history, routes}) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        { routes }
      </Router>
    </Provider>
  )
}

export default Root
