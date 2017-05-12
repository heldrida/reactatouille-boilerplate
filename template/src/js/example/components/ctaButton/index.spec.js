/* global describe expect it */

import React from 'react'
import {shallow} from 'enzyme'
import CtaButton from './index'

describe('Renders the ctaButton', () => {
  it('should have the correct className', () => {
    const ctaButton = shallow(
      <CtaButton callback={false} />
    )
    expect(ctaButton.is('.cta-button-container')).toBe(true)
  })
})
