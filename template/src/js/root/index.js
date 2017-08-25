import React from 'react'
import { Provider } from 'react-redux'

// const Root = ({store, history}) => {
//   return (
//     <Provider store={store}>
//       <BrowserRouter history={history}>
//         <Switch>
//           { rootRoutes.map(route => setRoute(route)) }
//         </Switch>
//       </BrowserRouter>
//     </Provider>
//   )
// }

const App = ({callback}) => {
  return (<div>APP: Hello world!</div>)
}

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root
