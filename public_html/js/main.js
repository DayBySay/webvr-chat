var players = new Object;
var socket = io.connect();
var player;

socket.on("connect", function(){
    player = new Player(socket.id);
    socket.emit("login", player);
});

socket.on("update", function(other){
    players[other.id] = other;
    var otherElement = document.getElementById(other.id);
    if (otherElement == null) {
        otherElement = initPlayer(document.getElementById("player-area"), other);
    } else {
        otherElement.setAttribute("position", other.position);
        otherElement.setAttribute("rotation", other.rotation);
    }
});

socket.on("init_players", function (players){
    players = players;
    initPlayerElementsWithPlayers(players, document.getElementById("player-area"));
});

socket.on("logout_other", function (other){
    var oe = document.getElementById(other.id);
    oe.parentNode.removeChild(oe);
});

function Player(id) {
    this.id = id;
    this.position = {"x": 0, "y": 1.6, "z": 0};
    this.rotation = {"x": 0, "y": 1.6, "z": 0};
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

function initPlayer(targetElement, player) {
    var pe = playerElement(player) 
    targetElement.appendChild(pe);
    return pe;
}

AFRAME.registerComponent("update-movement", {
    tick: function () {
        var elPosition = this.el.getAttribute("position");
        var elRotation = this.el.getAttribute("rotation");
        if (elPosition.x != player.position.x || elPosition.z != player.position.z || elRotation.x != player.rotation.x || elRotation.y != player.rotation.y || elRotation.z != player.rotation.z) {
            player.position = elPosition;
            player.rotation = elRotation;
            socket.emit("update", player);
        }
    }
});
