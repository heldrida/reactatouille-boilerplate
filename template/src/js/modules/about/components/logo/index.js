import React from 'react'

const Logo = ({image, style, replay}) => {
  return (
    <img className='logo' src={image} style={style} alt='My logo!' onClick={() => replay()} />
  )
}

export default Logo
