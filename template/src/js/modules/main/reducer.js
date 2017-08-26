// main/reducer.js
import * as t from './actionTypes'
import { combineReducers } from 'redux'
import { NOT_FOUND } from 'redux-first-router'

const lastUpdated = (state = 0, action) => action.type === t.REPLAY ? action.payload : state
const page = (state = components.HOME, action = {}) => components[action.type] || state

const components = {
  HOME: 'Home',
  ABOUT: 'About',
  [NOT_FOUND]: 'NotFound'
}

const reducer = combineReducers({
  lastUpdated,
  page
})

export default reducer
