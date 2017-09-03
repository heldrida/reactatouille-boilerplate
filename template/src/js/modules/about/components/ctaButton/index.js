import React from 'react'
import { Link } from 'react-router-dom'

const CtaButton = ({text, callback}) => {
  return (
    <div className='cta-button-container'>
      <Link to='/about'>{text}</Link>
    </div>
  )
}

export default CtaButton
