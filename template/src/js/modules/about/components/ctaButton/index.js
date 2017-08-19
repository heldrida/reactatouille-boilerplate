import React from 'react'

const CtaButton = ({callback}) => {
  return (
    <div className='cta-button-container'>
      <button onClick={callback}>Replay</button>
    </div>
  )
}

export default CtaButton