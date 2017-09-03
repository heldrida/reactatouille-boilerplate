import main from 'modules/main'
import about from 'modules/about'

const rootRoutes = [
  {
    path: '/',
    component: main.containers.App,
    exact: true,
    routes: [{
      path: '/',
      component: about.containers.HomePanel,
      exact: true
    }, {
      path: '/about',
      component: about.containers.About,
      exact: true
    }]
  }
]

export default rootRoutes
