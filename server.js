var express = require('express')
  , http = require('http')
  , app = express();
app.use(express.static(__dirname));
var port = process.env.PORT || 5000;
var server = http.createServer(app).listen(port);

var socketio = require('socket.io');
var io = socketio.listen(server);

var players = new Object;

io.sockets.on('connection', function(socket) {
    socket.on("login", function (player) {
        players[socket.id] = player;
        console.log("login");
        console.log(players);

        io.to(socket.id).emit("init_players", players);
        socket.broadcast.emit("update", player);
    })

    socket.on("update", function(player){
        players[socket.id] = player;
        socket.broadcast.emit("update", player);
        console.log("update");
        console.log(player);
    })

    socket.on("disconnect", function () {
        socket.broadcast.emit("logout_other", players[socket.id]);
        delete players[socket.id]
        console.log("logout");
        console.log(players);
    })
});
