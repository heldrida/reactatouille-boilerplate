// about/reducer.js
import * as t from './actionTypes'

const initialState = {
  lastUpdated: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.REPLAY:
      return action.payload
    default:
      return state
  }
}