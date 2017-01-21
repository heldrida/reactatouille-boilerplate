var babel = require('babel-polyfill'),
	express = require('express'),
	path = require('path'),
	app = express(),
	router = express.Router(),
	port = process.env.PORT ? process.env.PORT : (process.env.NODE_ENV === 'development' ? 3001 : 3000),
	dist = path.join(__dirname, ('dist' + (process.env.NODE_ENV ? '/' + process.env.NODE_ENV : 'staging'))),
	superagent = require('superagent'),
	config = require('./config'),
	serverInstance = null

process.on('uncaughtException', function (err) {
	throw err;
})

process.on('SIGINT', function () {
	serverInstance.close();
	process.exit(0);
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/**
 * Healthcheck
 */
app.use('/healthcheck', function (req, res) {
	res.json({
		'env': {
			'NODE_ENV': process.env.NODE_ENV
		}
	});
	res.end();
});

router.use('/assets', express.static(dist));

router.use('/api/test', function (req, res) {
	superagent
		.get('https://jsonip.com/')
		.end(function (err, response) {
			res.send(response.body);
		});
});

// router order matters
// see example for route named `/`
router.get('/', function (req, res) {
	res.sendFile(path.join(dist, 'index.html'));	
});

// any other is mapped here
router.get('*', function(req, res, next) {
	
	// Catch-all route after the ones you want to exclude like the example before '/' 
	// or exclude it here (this has the advantage of ordering however you'd like)
	if (req.url === '/' || req.url === '/foobar') {
		return next()
	};

	res.sendFile(path.join(dist, 'index.html'));
});

app.disable('x-powered-by');

app.use('/', router);

serverInstance = app.listen(port, function (error) {
	if (error) {
		console.log(error); // eslint-disable-line no-console
	}
	console.log('[' + config.build_name + '] listening on port ' + port + '!');
});