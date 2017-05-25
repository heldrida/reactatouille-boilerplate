import React, { Component } from 'react'
import { TweenLite } from 'gsap'
import { styleObjectParser } from '../../utils'
import { loadImage } from 'reactatouille'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { replay } from '../actions'
import { withRouter, Route } from 'react-router'
import HomePanel from '../components/homePanel'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      style: 'opacity: 0'
    }
    this.image = loadImage('logo-reactatouille-boilerplate.png')
    this.style = styleObjectParser(this.state.style)
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

  render () {
    return (
      <div>
        <HomePanel image={this.image} style={this.style} replay={this.props.replay}>
          { Array.isArray(this.props.routes) && this.props.routes.map(route => <Route key={route.path} {...route} />) }
        </HomePanel>
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
