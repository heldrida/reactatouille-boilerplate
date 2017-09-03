import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Utils from 'utils'

class About extends Component {
  componentDidMount () {
    Utils.animations.onReveal({
      el: this.refs.aboutContainer
    })
  }

  render () {
    return (
      <div ref='aboutContainer' className='about-container'>
        <h1>About</h1>
        <p>Reactatouille provides a simple boilerplate setup to allow the developer to focus in what matters.</p>
        <Link to='/'>Go back</Link>
      </div>
    )
  }
}

export default About
