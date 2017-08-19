import React from 'react'

const Logo = ({image, style}) => {
  return (
    <img className='logo' src={image} style={style} alt='My logo!' />
  )
}

export default Logo