import React, { Component } from 'react'
import { TweenLite } from 'gsap'
import { styleObjectParser } from '../utils'

const img = require('../../images/logo-reactatouille-boilerplate.png')

// include the stylesheet entry point
require('../../sass/app.scss')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      style: ''
    }
  }

  componentDidMount () {
    let onComplete = () => {
      this.state.style = this.refs['logo'].getAttribute('style')
    }
    TweenLite.fromTo(this.refs.logo, 0.8, { opacity: 0, x: 50 }, { opacity: 1, x: 0, ease: window.Bounce.easeOut, onComplete })
  }

  render () {
    return (
      <div className='app'>
        <img ref='logo' src={img} alt='' style={styleObjectParser(this.state.style)} />
      </div>
    )
  }

}

export default App
