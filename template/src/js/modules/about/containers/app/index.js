import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { replay } from '../../actions'
import { withRouter, Route } from 'react-router'
import HomePanel from '../../components/homePanel'
import Utils from 'utils'
import Config from 'config'
import * as actions from '../../actions'
import * as components from '../../components'
import * as constants from '../../constants'

const API = {
  actions,
  components,
  constants
  // containers, TODO: ** CIRCULAR DEPENDENCY, had to import directly, try improve? **
}

class App extends Component {
  render () {
    return (
      <div>
        <h1>test</h1>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    [API.constants.NAME]: state[API.constants.NAME]
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators({
    replay: replay
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(App))