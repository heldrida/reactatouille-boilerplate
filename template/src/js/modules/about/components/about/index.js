import React from 'react'
import { Link } from 'react-router-dom'

const About = () => (
  <div className='about-container'>
    <h1>About</h1>
    <p>Reactatouille provides a simple boilerplate setup to allow the developer to focus in what matters.</p>
    <Link to='/'>Go back</Link>
  </div>
)

export default About
