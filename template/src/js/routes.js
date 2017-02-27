import React from 'react'
import { Route } from 'react-router'
import App from './containers/app'
import Foobar from './containers/foobar'

export default (
  <Route path='/' component={App}>
    <Route path='foobar' component={Foobar} />
  </Route>
)
