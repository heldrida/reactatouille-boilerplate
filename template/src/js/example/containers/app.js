import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { replay } from '../actions'
import { withRouter, Route } from 'react-router'
import HomePanel from '../components/homePanel'
import { isBrowser } from 'reactatouille'

// include the stylesheet entry-point
isBrowser() && require('../../../sass/app.scss')

class App extends Component {
  render () {
    return (
      <div>
        <HomePanel replay={this.props.replay} lastUpdated={this.props.example.lastUpdated}>
          { Array.isArray(this.props.routes) && this.props.routes.map(route => <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />) }
        </HomePanel>
      </div>
    )
  }
}

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
