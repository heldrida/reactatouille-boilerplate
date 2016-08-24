import React from 'react';
import ReactDOM from "react-dom";
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';

ReactDOM.render(
	<Provider>
		<Router routes={ routes } />
	</Provider>,
    document.getElementById('app')
);