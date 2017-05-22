import React, { Component } from 'react'
import { TweenLite } from 'gsap'
import { styleObjectParser } from '../../utils'
import { loadImage, isBrowser } from 'reactatouille'
import Logo from '../components/logo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { replay } from '../actions'
import CtaButton from '../components/ctaButton'
import { withRouter } from 'react-router'

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
    this.logoAnimation()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.example.lastUpdated !== this.props.example.lastUpdated) {
      this.logoAnimation()
    }
  }

  logoAnimation () {
    const myLogo = document.querySelector('img.logo')
    let onComplete = () => {
      this.setState({
        style: myLogo.getAttribute('style').replace('z-index', 'zIndex')
      })
    }
    TweenLite.fromTo(myLogo, 0.8, { opacity: 0, x: 50, zIndex: 'auto' }, { opacity: 1, x: 0, zIndex: 'auto', ease: Bounce.easeOut, onComplete }) // eslint-disable-line no-undef
  }

  replayAnimation () {
    this.props.replay()
  }

  render () {
    const image = loadImage('logo-reactatouille-boilerplate.png')
    const style = styleObjectParser(this.state.style)
    return (
      <div className='app'>
        <Logo image={image} style={style} />
        { this.props.children }
        <CtaButton callback={() => this.replayAnimation()} />
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

function matchDispatchToProps (dispatch) {
  return bindActionCreators({
    replay: replay
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(App))
