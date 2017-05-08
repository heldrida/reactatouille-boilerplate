// rootReducer.js
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import example from './example'

export default combineReducers({
  routing: routerReducer,
  [example.constants.NAME]: example.reducer
})
