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
    this.image = Utils.helpers.loadImage('logo-reactatouille-boilerplate.png')
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
    Utils.animations.onHomePanelReveal({
      el: this.logo,
      onComplete: () => {
        this.setState({
          style: this.logo.getAttribute('style').replace('z-index', 'zIndex')
        })
      }
    })
  }

  render () {
    return (
      <div className='app home-panel'>
        <Logo image={this.image} style={this.style} />
        <CtaButton callback={() => this.props.replay()} />
      </div>
    )
  }
}

export default HomePanel