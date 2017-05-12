/* global describe expect it */

import React from 'react'
import {shallow} from 'enzyme'
import Logo from './index'

describe('Renders the logo', () => {
  it('should have the correct className', () => {
    const logo = shallow(
      <Logo src='foobar.jpg' style='border: 0; width: 10px; height: 10px;' />
    )
    expect(logo.is('.logo')).toBe(true)
  })
})
