import React from 'react'
import { Route } from 'react-router'
import example from './example'

export default (
  <div>
    <Route path='/' component={example.containers.App} />
  </div>
)
