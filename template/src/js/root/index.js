import React from 'react'
import { Provider } from 'react-redux'
import MainApi from 'modules/main'
import AboutApi from 'modules/about'

const App = AboutApi.containers.HomePanel

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root
