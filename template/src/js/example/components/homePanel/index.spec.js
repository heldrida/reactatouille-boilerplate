/* global describe expect it */

import React from 'react'
import {shallow} from 'enzyme'
import HomePanel from './index'

describe('Renders the ctaButton', () => {
  it('should have the correct className', () => {
    const homePanel = shallow(
      <HomePanel callback={false} />
    )
    expect(homePanel.is('.home-panel')).toBe(true)
  })
})
