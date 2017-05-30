import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

export default function configureStore (initialState) {
  const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
  const enchancers = composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(browserHistory))
  )
  const store = createStore(
    rootReducer,
    enchancers
  )
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = rootReducer
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
