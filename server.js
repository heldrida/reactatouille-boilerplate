var express = require('express'),
	path = require('path'),
	app = express(),
	port = process.env.PORT ? process.env.PORT : 8080,
	dist = path.join(__dirname, 'dist')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static(dist));

app.get('/', function(req, res) {
	res.sendFile(path.join(dist, 'index.html'));
});

app.listen(port, function (error) {

	if (error) {
		console.log(error); // eslint-disable-line no-console
	}

	console.info('Express is listening on port %s.', port); // eslint-disable-line no-console

});