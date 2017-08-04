// example/actions.js
import * as t from './actionTypes'

export const replay = (time = new Date().getTime()) => ({
  type: t.REPLAY,
  payload: {
    lastUpdated: time
  }
})