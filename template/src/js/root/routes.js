import main from 'modules/main'

const rootRoutes = [
  {
    path: '/',
    component: main.containers.App,
    exact: true,
    routes: [{
      path: '/logo',
      component: main.components.Logo
    }]
  }
]

export default rootRoutes