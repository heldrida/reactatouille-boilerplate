// rootReducer.js
import { combineReducers } from 'redux'
import example from './example'

export default combineReducers({
  [example.constants.NAME]: example.reducer
})
