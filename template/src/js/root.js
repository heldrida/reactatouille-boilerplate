import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './routes'
import { renderRoutes } from 'react-router-config'

// { routes.map(route => <Route key={route.path} {...route} />) }
//           { renderRoutes(routes) }

const setRoute = (route) => {
  // React.createElement(myVar.componentName, props, ...children)
  const MyComponent = route.component
  return <Route key={route.path} component={() => (<MyComponent routes={route.routes} />)} />
}

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Switch>
          { routes.map(route => setRoute(route)) }
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default Root
