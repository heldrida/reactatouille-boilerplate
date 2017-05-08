// example/index.js
import * as actions from './actions'
import * as components from './components'
import * as constants from './constants'
import reducer from './reducer'
import * as selectors from './selectors'

// The module index is responsible for maintaining its public API
export default { actions, components, constants, reducer, selectors }
