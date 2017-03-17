const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var proxy = require('express-http-proxy');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
const app = express();

app.use(bodyParser.json());
var router = express.Router({
  mergeParams: true
})

router.use(function (req, res, next) {
  console.log(req.method, 'for', req.params.username, 'at', req.path)
  next()
})

app.use(express.static(path.join(__dirname, 'dist')));

// API route
app.use('/auth', proxy('http://localhost:9000', {
  forwardPath: function(req, res) {
    return require('url').parse('/auth'+req.url).path;
  }
}));
app.use('/api', proxy('http://localhost:9000', {
  forwardPath: function(req, res) {
    return require('url').parse('/api'+req.url).path;
  }
}));

// app.use('/sock/', proxy('http://localhost:9000/socket.io/', {
//   forwardPath: function(req, res) {
//     return require('url').parse('/socket.io/'+req.url).path;
//   }
// }));

app.all("/socket.io/*", function(req, socket, head) {
    console.log('redirecting to realtime api');
    apiProxy.ws(req, socket, head, {target: 'ws://localhost:9000'});
});


// catch all
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.port || '80';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on port ${port}`));