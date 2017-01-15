var express = require('express')
  , http = require('http')
  , app = express();
app.use(express.static(__dirname + "/public_html"));
var port = process.env.PORT || 5000;
var server = http.createServer(app).listen(port);

var socketio = require('socket.io');
var io = socketio.listen(server);

var players = new Object;

var seats = {
	"male": [
		{"id": 0, x: 0, z: 3, on: false},
		{"id": 1, x: 3, z: 3, on: false},
		{"id": 2, x: -3, z: 3, on: false}
	],
	"female": [
		{"id": 0, x: 0, z: -3, on: false},
		{"id": 1, x: 3, z: -3, on: false},
		{"id": 2, x: -3, z: -3, on: false}
	]
}

function shouldAssignSeatsWithGender(gender) {
	var st = seats[gender];
	for (id in st) {
		if (st[id].on) {
			continue
		} else {
			return true;
		}
	}

	return false;
}

function getSeatIfPossibleWithGenser(gender) {
	if (!shouldAssignSeatsWithGender(gender)) {
		return 
	}

	var seat;

	var st = seats[gender];
	for (id in st) {
		console.log(st[id]);
		if (st[id].on) {
			continue;
		}

		seat = st[id];
	}

	seat.on = true;
	return seat;
}

io.sockets.on('connection', function(socket) {
    socket.on("login", function (player) {
		var seat = getSeatIfPossibleWithGenser(player.gender);
		if (seat === undefined) {
			return
		}

		player.position.x = seat.x;
		player.position.z = seat.z;
		player.seat = seat;
        players[socket.id] = player;

        io.to(socket.id).emit("init_users", players);
        socket.broadcast.emit("init_other", player);
        console.log("login");
        console.log(players);
    })

    socket.on("update", function(player){
        players[socket.id] = player;
        console.log(player);
        socket.broadcast.emit("update_other", player);
        console.log("update_other");
        console.log(players);
    })

    socket.on("disconnect", function () {
		var player = players[socket.id];
		var st = seats[player.gender];
		for (id in st) {
			if (st[id].id === player.seat.id) {
				st[id].on = false;
			}
		}

        socket.broadcast.emit("logout_other", player);
        delete players[socket.id]
        console.log("logout_other");
        console.log(players);
		console.log(seats);
    })
});
