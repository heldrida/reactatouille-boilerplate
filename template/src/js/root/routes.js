import example from '../example'

const rootRoutes = [
  {
    path: '/',
    component: example.containers.App,
    exact: true,
    routes: [{
      path: '/logo',
      component: example.components.Logo
    }]
  }
]

export default rootRoutes
