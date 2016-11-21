// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./root.prod');
// } else {
//   module.exports = require('./root.dev');
// }

import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Router, browserHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './store'

// include the stylesheet entry point
require('../sass/app.scss');

export default class Root extends Component {
  render() {
    return (
		<Provider store={ this.props.store }>
			<div>
				<Router history={ this.props.history } routes={ routes } />
			</div>
		</Provider>
    );
  }
}