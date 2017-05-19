import React from 'react'
import { Router, Route } from 'react-router'
import example from './example'

export default (
  <div>
    <Route path='/' component={example.containers.App} />
    <Route path='/myOther' component={example.containers.App} />
  </div>
)
