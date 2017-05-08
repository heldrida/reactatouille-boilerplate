// example/reducer.js
import * as t from './actionTypes'

const initialState = [{
  id: 0,
  completed: false,
  text: 'Use Redux'
}]

export default (state = initialState, action) => {
  switch (action.type) {
    case t.ADD:
      return [...state, action.payload]
    default:
      return state
  }
}
