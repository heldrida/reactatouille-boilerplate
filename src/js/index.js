import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './root';

render(
  <AppContainer
    component={ Root }
  />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./root', () => {
    render(
      <AppContainer
        component={require('./root').default}
      />,
      document.getElementById('app')
    );
  });
}