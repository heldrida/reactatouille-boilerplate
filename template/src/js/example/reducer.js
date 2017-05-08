// example/reducer.js
import * as t from './actionTypes'

const initialState = {
  lastUpdated: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.REPLAY:
      console.log('example/reducer/switch:t.REPLAY/state: ', state)
      console.log('example/reducer/switch:t.REPLAY/action.payload: ', action.payload)
      return action.payload
    default:
      return state
  }
}
