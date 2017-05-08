import React, { Component } from 'react'
import { TweenLite } from 'gsap'
import { styleObjectParser } from '../../utils'
import { loadImage, isBrowser } from 'reactatouille'
import Logo from '../components/logo'
import { connect } from 'react-redux'
// include the stylesheet entry-point
isBrowser() && require('../../../sass/app.scss')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      style: 'opacity: 0'
    }
  }

  componentDidMount () {
    const myLogo = document.querySelector('img.logo')
    let onComplete = () => {
      this.setState({
        style: myLogo.getAttribute('style')
      })
    }
    TweenLite.fromTo(myLogo, 0.8, { opacity: 0, x: 50 }, { opacity: 1, x: 0, ease: Bounce.easeOut, onComplete }) // eslint-disable-line no-undef
  }

  render () {
    const image = loadImage('logo-reactatouille-boilerplate.png')
    const style = styleObjectParser(this.state.style)
    return (
      <div className='app'>
        <Logo image={image} style={style} />
        { this.props.children }
      </div>
    )
  }
}

// export default App
function mapStateToProps (state, ownProps) {
  return {
    example: state.example
  }
}

export default connect(mapStateToProps)(App)
