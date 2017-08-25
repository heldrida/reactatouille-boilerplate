import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HomePanel from '../../components/homePanel'
import * as actions from '../../actions'
import * as components from '../../components'
import * as constants from '../../constants'

const API = {
  actions,
  components,
  constants
}

class HomePanelContainer extends Component {
  render () {
    return (
      <div>
        <HomePanel replay={this.props.replay} lastUpdated={this.props[API.constants.NAME].lastUpdated} />
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  console.log('state: ', state)
  return {
    [API.constants.NAME]: state[API.constants.NAME]
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators({
    replay: actions.replay
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(HomePanelContainer)
