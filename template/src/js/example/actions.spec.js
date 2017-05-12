/* global describe expect it */

import { replay } from './actions'

describe('The example actions', () => {
  it('should return a default time', () => {
    const startTimestamp = new Date().getTime()
    const action = replay()
    expect(action).toHaveProperty('payload.lastUpdated')
    expect(action).toHaveProperty('type')
    expect(action.payload.lastUpdated).toBeGreaterThanOrEqual(startTimestamp)
  })
})
