import React, { Component } from 'react'
import * as Utils from '../../utils'
import { loadImage, isBrowser } from 'reactatouille'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { replay } from '../actions'
import { withRouter, Route } from 'react-router'
import HomePanel from '../components/homePanel'

class App extends Component {
  constructor (props) {
    super(props)
    this.isBrowser = isBrowser()
    this.state = {
      style: ''
    }
    this.image = loadImage('logo-reactatouille-boilerplate.png')
    this.style = Utils.helpers.styleObjectParser(this.state.style)
  }

  componentDidMount () {
    this.isBrowser && this.logoAnimation()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.example.lastUpdated !== this.props.example.lastUpdated) {
      this.isBrowser && this.logoAnimation()
    }
  }

  logoAnimation () {
    const el = document.querySelector('img.logo')
    Utils.animations.onHomePanelReveal({
      el: el,
      onComplete: () => {
        this.setState({
          style: el.getAttribute('style').replace('z-index', 'zIndex')
        })
      }
    })
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
