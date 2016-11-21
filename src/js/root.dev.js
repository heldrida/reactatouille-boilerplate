import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, push } from 'react-router-redux';
import routes from './routes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import DevTools from './containers/devTools';

// include the stylesheet entry point
require('../sass/app.scss');

const store = createStore(
	reducers,
	applyMiddleware(thunk),
	applyMiddleware(routerMiddleware(browserHistory))
);

const history = syncHistoryWithStore(browserHistory, store);

export default class Root extends Component {
  render() {
    return (
		<Provider store={ store }>
			<div>
				<Router history={ history } routes={ routes } />\
				<DevTools />
			</div>
		</Provider>
    );
  }
}