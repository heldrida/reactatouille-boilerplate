// about/index.js
import * as actions from './actions'
import * as actionTypes from './actionTypes'
import * as components from './components'
import * as containers from './containers'
import * as constants from './constants'
import reducer from './reducer'
import * as selectors from './selectors'

// The module index is responsible for maintaining its public API
export default { actions, actionTypes, components, containers, constants, reducer, selectors }