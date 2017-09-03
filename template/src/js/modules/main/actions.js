// example/actions.js
import * as t from './actionTypes'

export const setAppLoadTime = (time = new Date()) => ({
  type: t.APP_LOAD_TIME,
  payload: {
    appLoadTime: time
  }
})
