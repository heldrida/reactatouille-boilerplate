/* global describe expect it */
import { replay } from './actions'
import example from './reducer'

describe('The example reducer', () => {
  it('should handle REPLAY', () => {
    const time = new Date().getTime()
    const store = example({ lastUpdated: time }, replay(time))
    expect(store).toMatchObject({ lastUpdated: time })
  })
})
