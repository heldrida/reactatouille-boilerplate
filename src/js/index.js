import React from 'react';
import { render } from 'react-dom';
import { router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import Root from './root';
import configureStore from './store'
import routes from './routes';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Root store={ store } history={ history } routes={ routes } />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    const NextRoot = require('./root').default;
    render(
      <AppContainer>
         <NextRoot store={ store } history={ history } routes={ newRoutes } />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}