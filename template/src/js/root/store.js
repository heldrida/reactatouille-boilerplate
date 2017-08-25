import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { connectRoutes } from 'redux-first-router'
import routes from './routes'
// import * as reducers from './reducers'
// import * as actionCreators from './actions'

const reducers = []
const actionCreators = []

export default history => {
  const { reducer, middleware, enhancer } = connectRoutes(history, routes.map, routes.options)
  const rootReducer = combineReducers({ location: reducer })
  const middlewares = applyMiddleware(middleware)
  const enhancers = composeEnhancers(enhancer, middlewares)

  return createStore(rootReducer, enhancers)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators })
  : compose
