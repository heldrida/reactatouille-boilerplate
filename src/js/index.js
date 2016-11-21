import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import Root from './root';
import configureStore from './store'

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
  	<Root store={ store } history={ history } />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./root', () => {
	const NextRoot = require('./root').default;
    render(
		<AppContainer>
      		<NextRoot store={ store } history={ history } />
      	</AppContainer>,
      document.getElementById('app')
    );
  });
}