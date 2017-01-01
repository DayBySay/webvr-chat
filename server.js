var express = require('express')
  , http = require('http')
  , app = express();
app.use(express.static(__dirname));
var port = process.env.PORT || 5000;
var server = http.createServer(app).listen(port);

var socketio = require('socket.io');
var io = socketio.listen(server);

io.sockets.on('connection', function(socket) {
});
