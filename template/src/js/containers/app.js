import React, { Component } from 'react'
import { TweenLite } from 'gsap'
import { styleObjectParser } from '../utils'
import { loadImage, isBrowser } from 'reactatouille'

// include the stylesheet entry-point
isBrowser() && require('../../sass/app.scss')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      style: 'opacity: 0'
    }
  }

  componentDidMount () {
    let onComplete = () => {
      this.setState({
        style: this.refs['logo'].getAttribute('style')
      })
    }
    TweenLite.fromTo(this.refs.logo, 0.8, { opacity: 0, x: 50 }, { opacity: 1, x: 0, ease: Bounce.easeOut, onComplete }) // eslint-disable-line no-undef
  }

  render () {
    return (
      <div className='app'>
        <img ref='logo' src={loadImage('logo-reactatouille-boilerplate.png')} alt='' style={styleObjectParser(this.state.style)} />
      </div>
    )
  }

}

export default App
