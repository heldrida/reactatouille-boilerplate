import React from 'react';
import ReactDOM from "react-dom";
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, push } from 'react-router-redux';
import routes from './routes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

// include the stylesheet entry point
require('../sass/app.scss');

const store = createStore(
	reducers,
	applyMiddleware(thunk),
	applyMiddleware(routerMiddleware(browserHistory))
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={ store }>
		<Router history={ history } routes={ routes } />
	</Provider>,
	document.getElementById('app')
);