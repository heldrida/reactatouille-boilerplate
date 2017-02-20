import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes'

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        { routes }
      </Router>
    </Provider>
  )
}

export default Root
