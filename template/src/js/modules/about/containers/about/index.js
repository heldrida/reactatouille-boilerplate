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

const { About } = API.components

class AboutContainer extends Component {
  render () {
    return (
      <div>
        <About goPage={this.props.goPage} />
      </div>
    )
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    goPage: MainApi.actions.goPage
  }, dispatch)
}

export default connect(null, matchDispatchToProps)(AboutContainer)
