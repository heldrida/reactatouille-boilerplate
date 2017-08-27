import React from 'react'

const About = ({ goPage }) => (
  <div className='about-container'>
    <h1>About</h1>
    <p>Reactatouille provides a simple boilerplate setup to allow the developer to focus in what matters.</p>
    <button onClick={() => goPage('HOME')}>Go back</button>
  </div>
)

export default About
