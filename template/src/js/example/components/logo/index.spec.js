/* global test expect it */

import React from 'react'
import {shallow, mount} from 'enzyme'
import Logo from './index'

test('Renders the logo', () => {
  it('should not crash', () => {
    mount(<Logo />)
  })
  it('should have the correct className', () => {
    const logo = shallow(
      <Logo src='foobar.jpg' style='border: 0; width: 10px; height: 10px;' />
    )
    expect(logo.is('.logo')).to.equal(true)
  })
})
