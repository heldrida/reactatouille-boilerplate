import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        <About />
      </div>
    )
  }
}

export default connect(null, null)(AboutContainer)
