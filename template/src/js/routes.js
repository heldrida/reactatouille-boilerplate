import example from './example'

const routes = [
  {
    path: '/',
    component: example.components.App,
    exact: true,
    routes: [{
      path: '/logo',
      component: example.components.Logo
    }]
  }
]

export default routes
