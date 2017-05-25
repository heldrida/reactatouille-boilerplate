import React from 'react'
import CtaButton from '../ctaButton'
import Logo from '../logo'

const HomePanel = ({image, style, routes, replay}) => (
  <div className='app'>
    <Logo image={image} style={style} />
    <CtaButton callback={() => replay()} />
  </div>
)

export default HomePanel
