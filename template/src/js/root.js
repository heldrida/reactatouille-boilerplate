import React from 'react'
import { Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './routes'
import { renderRoutes } from 'react-router-config'

// { routes.map(route => <Route key={route.path} {...route} />) }

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Switch>
          { renderRoutes(routes) }
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default Root
