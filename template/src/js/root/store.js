import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { connectRoutes } from 'redux-first-router'
import routes from './routes'
import rootReducer from './reducer'
import AboutApi from 'modules/about'

// TODO: combine all the modules actions
const actionCreators = AboutApi.actions
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators })
  : compose

export default history => {
  const { reducer: routesReducer, middleware, enhancer } = connectRoutes(history, routes.map, routes.options)
  const combinedReducers = combineReducers(Object.assign(rootReducer, { location: routesReducer }))
  const middlewares = applyMiddleware(middleware)
  const enhancers = composeEnhancers(enhancer, middlewares)

  return createStore(combinedReducers, enhancers)
}
