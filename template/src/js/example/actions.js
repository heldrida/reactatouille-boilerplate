// example/actions.js
import * as t from './actionTypes'

export const replay = () => ({
  type: t.REPLAY,
  payload: {
    dateLastUpdated: new Date().getTime()
  }
})
