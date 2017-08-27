import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MainApi from 'modules/main'
import * as actions from 'modules/about/actions'
import * as components from 'modules/about/components'
import * as constants from 'modules/about/constants'

const API = {
  actions,
  components,
  constants
}

const { HomePanel } = components

class HomePanelContainer extends Component {
  render () {
    return (
      <div>
        <HomePanel replay={this.props.replay} lastUpdated={this.props[API.constants.NAME].lastUpdated} goPage={this.props.goPage} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  [API.constants.NAME]: state[API.constants.NAME]
})

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    replay: actions.replay,
    goPage: MainApi.actions.goPage
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(HomePanelContainer)
