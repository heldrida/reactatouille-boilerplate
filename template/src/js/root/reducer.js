// rootReducer.js
import { routerReducer as routing } from 'react-router-redux'
import about from 'modules/about'
import main from 'modules/main'

const rootReducer = {
  [about.constants.NAME]: about.reducer,
  routing,
  [main.constants.NAME]: main.reducer
}

export default rootReducer
