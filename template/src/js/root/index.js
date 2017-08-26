import React from 'react'
import { Provider } from 'react-redux'
// import AboutApi from 'modules/about'
import MainApi from 'modules/main'

const App = MainApi.containers.App

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root
