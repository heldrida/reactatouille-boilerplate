import React, { Component } from 'react';

const img = require('../../images/logo-reactatouille-boilerplate.png')

class App extends Component {

	componentDidMount() {

	}

	render() {

		return (
			<div className="app">
				<img src={ img } alt='' />
			</div>
		);

	}

}

export default App;
