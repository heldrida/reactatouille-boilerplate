import React, { Component } from 'react'
import { TweenLite } from 'gsap'
import { styleObjectParser } from '../utils'

// const img = require('../../images/logo-reactatouille-boilerplate.png')

// include the stylesheet entry point
// require('../../sass/app.scss')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      style: '',
      test: ''
    }
  }

  componentDidMount () {
    let onComplete = () => {
      this.state.style = this.refs['logo'].getAttribute('style')
    }
    // TweenLite.fromTo(this.refs.logo, 0.8, { opacity: 0, x: 50 }, { opacity: 1, x: 0, ease: Bounce.easeOut, onComplete }) // eslint-disable-line no-undef
    setTimeout(() => {
      this.setState({
        test: 'foo bar test resolved!'
      })
    }, 3000)
  }

  render () {
    return (
      <div className='app'>
        <h1>Hello {this.state.test}</h1>
        {this.props.children}
      </div>
    )
  }

}

export default App
