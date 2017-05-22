import example from './example'

const routes = [
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

export default routes
