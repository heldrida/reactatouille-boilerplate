// main/reducer.js
import * as t from './actionTypes'

const initialState = {
  appLoadTime: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.APP_LOAD_TIME:
      return {
        ...state,
        appLoadTime: action.payload.appLoadTime
      }
    default:
      return state
  }
}
