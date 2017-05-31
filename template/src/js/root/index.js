import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import rootRoutes from './routes'

const setRoute = (route) => {
  const MyComponent = route.component
  return <Route key={route.path} component={() => (<MyComponent routes={route.routes} />)} />
}

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Switch>
          { rootRoutes.map(route => setRoute(route)) }
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default Root
