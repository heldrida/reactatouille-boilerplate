// rootReducer.js
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import example from './example'

const rootReducer = combineReducers({
  routing: routerReducer,
  [example.constants.NAME]: example.reducer
})

export default rootReducer
