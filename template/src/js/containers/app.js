import React, { Component } from 'react'
import { TweenLite } from 'gsap'
import { styleObjectParser } from '../utils'
import { loadImage } from 'reactatouille'

if (typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]') {
  // include the stylesheet entry point
  require('../../sass/app.scss')
}

const img = loadImage('logo-reactatouille-boilerplate.png')

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
    TweenLite.fromTo(this.refs.logo, 0.8, { opacity: 0, x: 50 }, { opacity: 1, x: 0, ease: Bounce.easeOut, onComplete }) // eslint-disable-line no-undef
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
