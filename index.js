navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var localStream;
var connectedCall;

var players = new Object;
var socket = require("socket.io-client")();
var player;
var peer;

socket.on("connect", function(){
    peer = new Peer({ key: 'f42387e2-4c9f-4951-bce2-cc7802643eba', debug: 3});

    peer.on('open', function(){
        window.player = new Player(peer.id);
        socket.emit("login", window.player);
    });

    peer.on('call', function(call){
        connectedCall = call;
        call.answer(localStream);

        call.on('stream', function(stream){
            var url = URL.createObjectURL(stream);
            var audio = document.getElementById("audio");
            audio.srcObject = stream;
            audio.play();
        });
    });

    navigator.getUserMedia({audio: true, video: false}, function(stream){
        localStream = stream;
    }, function() { alert("Error!"); });
});

socket.on("update", function(other){
    players[other.id] = other;
    var otherElement = document.getElementById(other.id);
    if (otherElement == null) {
        otherElement = initPlayer(document.getElementById("player-area"), other);

        var peerId = other.id;
        var call = peer.call(peerId, localStream);

        call.on('stream', function(stream){
            var url = URL.createObjectURL(stream);
            var audio = document.getElementById("audio");
            audio.srcObject = stream;
        });
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
        var face = document.createElement("a-plane");
        face.setAttribute("src", "#smile");
        face.setAttribute("position", "0 0 -0.51");
        face.setAttribute("rotation", " 0 180 0");
        box.appendChild(face);
        var cursor = document.createElement("a-cursor");

        playerElement.appendChild(cursor);
        playerElement.appendChild(box);
    } else {
        var playerElement = document.createElement("a-box");
        playerElement.setAttribute("material", "envMap: #smile;");
        playerElement.setAttribute("position", player.position);
        var face = document.createElement("a-plane");
        face.setAttribute("src", "#smile");
        face.setAttribute("position", "0 0 -0.51");
        face.setAttribute("rotation", " 0 180 0");
        playerElement.appendChild(face);
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
        if (elPosition.x != window.player.position.x || elPosition.z != window.player.position.z || elRotation.x != window.player.rotation.x || elRotation.y != window.player.rotation.y || elRotation.z != window.player.rotation.z) {
            window.player.position = elPosition;
            window.player.rotation = elRotation;
            socket.emit("update", window.player);
        }
    }
});
