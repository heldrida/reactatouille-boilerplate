// example/reducer.js
import * as t from './actionTypes'

const initialState = {
  dateLastUpdated: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.REPLAY:
      return [...state, action.payload]
    default:
      return state
  }
}
