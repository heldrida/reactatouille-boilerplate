var express = require('express'),
	path = require('path'),
	app = express(),
	http = require('http'),
	httpServer = http.Server(app),
	port = process.env.PORT ? process.env.PORT : 8080,
	dist = path.join(__dirname, 'dist')

app.use(express.static(dist));

app.get('*', function(req, res) {

	res.sendFile(path.join(dist, 'index.html'));

});

app.listen(port, function (error) {

	if (error) {
		console.log(error); // eslint-disable-line no-console
	}

	console.info('Express is listening on port %s.', port); // eslint-disable-line no-console

});