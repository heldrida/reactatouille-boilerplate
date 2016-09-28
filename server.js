var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app),
  port = process.env.port || 8080


app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function () {
  console.log('App from `dist` listening on port ' + port + '!');
});