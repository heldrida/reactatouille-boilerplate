// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./root.prod');
// } else {
//   module.exports = require('./root.dev');
// }

import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Router, browserHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './store'

// https://github.com/gaearon/react-hot-boilerplate/pull/61#issuecomment-211504531
Router.prototype.componentWillReceiveProps = function(nextProps) {
  let components = [];
  function grabComponents(element) {
    // This only works for JSX routes, adjust accordingly for plain JS config
    if (element.props && element.props.component) {
      components.push(element.props.component);
    }
    if (element.props && element.props.children) {
      React.Children.forEach(element.props.children, grabComponents);
    }
  }
  grabComponents(nextProps.routes || nextProps.children);
  components.forEach(React.createElement); // force patching
};

// include the stylesheet entry point
require('../sass/app.scss');

const Root = (props) => {
    return (
		<Provider store={ props.store }>
			<div>
				<Router history={ props.history }>
				{ props.routes() }
				</Router>
			</div>
		</Provider>
    );
}

export default Root;