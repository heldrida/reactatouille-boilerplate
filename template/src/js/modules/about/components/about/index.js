import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Utils from 'utils'

class About extends Component {
  componentDidMount () {
    Utils.animations.onReveal({
      el: [this.refs.title, this.refs.p, this.refs.link]
    })
  }

  render () {
    return (
      <div ref='aboutContainer' className='about-container'>
        <h1 ref='title'>About</h1>
        <p ref='p'>Reactatouille provides a simple boilerplate setup to allow the developer to focus in what matters.</p>
        <div ref='link'><Link to='/'>Go back</Link></div>
      </div>
    )
  }
}

export default About
