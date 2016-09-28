import React, { Component } from 'react';
import * as motion from 'popmotion';

class App extends Component {

	componentDidMount() {

		// todo: study popmotion and do this properly
		const h1 = document.querySelector('.app h1');
		const p = document.querySelector('.app p') 

		motion.tween({
			values: {
				x: {
					from: -30,
					to: 0
				},
				opacity: {
					from: 0,
					to: 1
				}
			}
		}).on(h1).start();

		motion.tween({
			delay: 300,
			values: {
				x: {
					from: -30,
					to: 0
				},
				opacity: {
					from: 0,
					to: 1
				}
			}
		}).on(p).start();

	}

	render() {

		return (
			<div className="app">
				<h1>Reaclux Boilerplate</h1>
				<p>A React Redux Webpack Gulp Sass Mocha Enzyme Zombie Chai Boilerplate by <span>Punkbit</span></p>
			</div>
		);

	}

}

export default App;