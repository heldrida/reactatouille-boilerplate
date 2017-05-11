/* global test expect it */

import React from 'react'
import {shallow, mount} from 'enzyme'
import CtaButton from './index'

test('Renders the ctaButton', () => {
  it('should mount', () => {
    mount(<CtaButton />)
  })
  it('should have the correct className', () => {
    const ctaButton = shallow(
      <CtaButton callback={false} />
    )
    expect(ctaButton.is('.cta-button-container')).to.equal(true)
  })
})
