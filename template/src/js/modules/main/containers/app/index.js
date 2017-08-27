import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Utils from 'utils'
import * as actions from '../../actions'
import * as components from '../../components'
import * as constants from '../../constants'
import * as selectors from '../../selectors'

const API = {
  actions,
  components,
  constants,
  selectors
  // containers, TODO: ** CIRCULAR DEPENDENCY, had to import directly, try improve? **
}

// include the stylesheet entry-point
Utils.helpers.isBrowser() && require('sass/app.scss')

class App extends Component {
  render () {
    return (
      <div className='main-wrapper'>
        {
          this.props.component
            ? this.props.component
            : <div>not found</div>
        }
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    [API.constants.NAME]: state[API.constants.NAME],
    location: state.location,
    component: API.selectors.getMapRouteComponent(state.location)
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators({
    replay: API.actions.replay
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
