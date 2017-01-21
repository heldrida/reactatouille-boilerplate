var config = {
	param1: '', // example
	param2: process.env.NODE_ENV === 'development' ? 'foo' : 'bar', // example
	git: {
		remoteList: ['origin', 'heroku'] // add any other remotes here
	},
	build_name: 'Build name Foobar'
}

// Modified production configuration parameters
if (process.env.NODE_ENV === 'production') {
	config.param1 = 'valueProduction';
}

module.exports = config;