import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, Route } from 'react-router'
import Utils from 'utils'
// import Config from 'config'
import * as actions from 'modules/main/actions'
import * as components from 'modules/main/components'
import * as constants from 'modules/main/constants'

// Exclude `containers` to prevent `circular dependency`
const API = {
  actions,
  components,
  constants
}

// include the stylesheet entry-point
Utils.helpers.isBrowser() && require('sass/app.scss')

class App extends Component {
  render () {
    return (
      <div className='app-container'>
        {
          Array.isArray(this.props.routes) && this.props.routes.map(route => <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  [API.constants.NAME]: state[API.constants.NAME],
  pathname: ownProps.location.pathname
})

const matchDispatchToProps = (dispatch) => bindActionCreators({
  replay: API.replay
}, dispatch)

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(App))
