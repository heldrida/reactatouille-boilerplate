// rootReducer.js
import { combineReducers } from 'redux'
import about from 'modules/about'
import main from 'modules/main'

const rootReducer = combineReducers({
  [about.constants.NAME]: about.reducer,
  [main.constants.NAME]: main.reducer
})

export default rootReducer
