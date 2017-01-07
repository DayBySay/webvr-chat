var players = new Object;
var socket = io.connect();
var player;

socket.on("connect", function(){
    player = new Player(socket.id);
    socket.emit("login", player);
});

socket.on("update", function(other){
    console.log("update");
    players[other.id] = other;
});

socket.on("init_players", function (players){
    players = players;
    initPlayerElementsWithPlayers(players, document.getElementById("player-area"));
});

function Player(id) {
    this.id = id;
    this.position = {"x": 0, "y": 1.6, "z": 0};
}

function updatePlayer(player) {
    var playerElement = document.getElementById(player.id);
    playerElement.setAttribute("position", player.position);
}

function playersWithPlayerIDs(playerIDs) {
    var players = new Object;
    playerIDs.forEach(function (val, index, arr) {
        var player = createPlayerWithPlayerID(val);
        players[val] = player;
    });

    return players;
}

function createPlayerWithPlayerID(id) {
    var player = new Player(id);
    return player;
}

function playerElement(player) {
    var playerElement;

    if (player.id == window.player.id) {
        playerElement = document.createElement("a-camera");
        playerElement.setAttribute("update-movement", "");
        var box = document.createElement("a-box");
        var cursor = document.createElement("a-cursor");

        playerElement.appendChild(cursor);
        playerElement.appendChild(box);
    } else {
        var playerElement = document.createElement("a-box");
        playerElement.setAttribute("position", player.position);
    }

    playerElement.setAttribute("id", player.id);

    return playerElement;
}

function initPlayerElementsWithPlayers(players, targetElement) {
    for (var playerID in players) {
        var pe = playerElement(players[playerID]);
        targetElement.appendChild(pe);
    }
}

AFRAME.registerComponent("update-movement", {
    tick: function () {
        if (this.el.getAttribute("position").x != player.position.x || this.el.getAttribute("position").z != player.position.z) {
            player.position = this.el.position;
            socket.emit("update", player);
        }
    }
});
