import React from 'react'

const CtaButton = ({text, callback}) => {
  return (
    <div className='cta-button-container'>
      <button onClick={callback}>{text}</button>
    </div>
  )
}

export default CtaButton
