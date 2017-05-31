// rootReducer.js
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import example from '../example'

const rootReducer = combineReducers({
  routing: routing,
  [example.constants.NAME]: example.reducer
})

export default rootReducer
