import { browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

export default function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(browserHistory))
  )
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
