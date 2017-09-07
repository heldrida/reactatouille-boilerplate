import React, { Component } from 'react'
import CtaButton from '../ctaButton'
import Logo from '../logo'
import Utils from 'utils'

class HomePanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      style: ''
    }
    this.logo = null
    this.image = '/assets/images/logo-reactatouille-boilerplate.png'
    this.style = Utils.helpers.styleObjectParser(this.state.style)
  }

  componentDidMount () {
    this.logo = document.querySelector('img.logo')
    Utils.helpers.isBrowser && this.logoAnimation()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.lastUpdated !== this.props.lastUpdated) {
      Utils.helpers.isBrowser && this.logoAnimation()
    }
  }

  logoAnimation () {
    Utils.animations.onReveal({
      el: [this.refs.logoContainer, this.refs.ctaContainer],
      onComplete: () => {
        this.setState({
          style: this.logo.getAttribute('style').replace('z-index', 'zIndex')
        })
      }
    })
  }

  render () {
    return (
      <div className='home-panel'>
        <div ref='logoContainer' className='container' onClick={() => this.props.replay()}>
          <Logo image={this.image} style={this.style} />
        </div>
        <div ref='ctaContainer' className='container'>
          <CtaButton text='about' />
        </div>
      </div>
    )
  }
}

export default HomePanel
