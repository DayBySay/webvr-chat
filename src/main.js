require("aframe");
require("socket.io-client");
var Player = require("./player");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var localStream;
var connectedCall;

var players = new Object;
var socket = require("socket.io-client")();
var player;
var peer;

socket.on("connect", function(){
    connectedServer();
});

socket.on("update", function(other){
    updateOther(other);
});

socket.on("init_players", function (players){
    players = players;
    initPlayerElementsWithPlayers(players, document.getElementById("player-area"));
});

socket.on("logout_other", function (other){
    var oe = document.getElementById(other.id);
    oe.parentNode.removeChild(oe);
});

function connectedServer() {
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
}

function updateOther(other) {
    players[other.id] = other;
    var otherElement = document.getElementById(other.id);
    if (otherElement == null) {
        initPlayerElement(document.getElementById("player-area"), other);

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
}

function updatePlayer(player) {
    var pe = document.getElementById(player.id);
    pe.setAttribute("position", player.position);
}

function initPlayerElementsWithPlayers(players, targetElement) {
    for (var playerID in players) {
        var pe = window.player.element(players[playerID]);
        targetElement.appendChild(pe);
    }
}

function initPlayerElement(targetElement, player) {
    var pe = window.player.element(player) 
    targetElement.appendChild(pe);
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
