// rootReducer.js
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import main from 'modules/main'

const rootReducer = combineReducers({
  routing: routing,
  [main.constants.NAME]: main.reducer
})

export default rootReducer