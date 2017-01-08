import aframe from 'aframe'
import Player from './player'
import socketio from 'socket.io-client'

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var localStream;
var connectedCall;

var players = new Object;
var socket = require('socket.io-client')();
var player;
var peer;

socket.on('connect', function(){
    connectedServer();
});

socket.on('update', function(other){
    updateOther(other);
});

socket.on('init_players', function (players){
    players = players;
    initPlayerElementsWithPlayers(players, document.getElementById('player-area'));
});

socket.on('logout_other', function (other){
    var oe = document.getElementById(other.id);
    oe.parentNode.removeChild(oe);
});

function audioElement(peerID) {
    let ae = document.getElementById('audio' + peerID)
    if (ae == null) {
        ae = document.createElement('audio')
        ae.setAttribute('id', 'audio' + peerID)
    }
    console.log(ae)

    return ae
}

function connectedServer() {
    peer = new Peer({ key: 'f42387e2-4c9f-4951-bce2-cc7802643eba', debug: 1});

    peer.on('open', function(){
        window.player = new Player(peer.id);
        socket.emit('login', window.player);
    });

    peer.on('call', function(call){
        connectedCall = call;
        call.answer(localStream);

        call.on('stream', function(stream){
            console.log('id: ' + call.peer + ' にcallされて繋がったよ！');
            var audio = audioElement(call.peer);
            audio.srcObject = stream;
            audio.play();
            document.getElementById("audio-area").appendChild(audio);
        });
    });

    navigator.getUserMedia({audio: true, video: false}, function(stream){
        localStream = stream;
    }, function() { alert('Error!'); });
}

function updateOther(other) {
    players[other.id] = other;
    var otherElement = document.getElementById(other.id);
    if (otherElement == null) {
        initPlayerElement(document.getElementById('player-area'), other);

        var peerId = other.id;
        var call = peer.call(peerId, localStream);

        call.on('stream', function(stream){
            console.log('id: ' + peerId + ' にcallして繋がったよ！');
            var audio = audioElement(peerId);
            audio.srcObject = stream;
            audio.play();
            document.getElementById("audio-area").appendChild(audio);
        });
    } else {
        otherElement.setAttribute('position', other.position);
        otherElement.setAttribute('rotation', other.rotation);
    }
}

function updatePlayer(player) {
    var playerElement = document.getElementById(player.id);
    playerElement.setAttribute('position', player.position);
}

function playerElement(player) {
    var playerElement;

    if (player.id == window.player.id) {
        playerElement = document.createElement('a-camera');
        playerElement.setAttribute('update-movement', '');
        var box = document.createElement('a-box');
        var face = document.createElement('a-plane');
        face.setAttribute('src', '#smile');
        face.setAttribute('position', '0 0 -0.51');
        face.setAttribute('rotation', ' 0 180 0');
        box.appendChild(face);
        var cursor = document.createElement('a-cursor');

        playerElement.appendChild(cursor);
        playerElement.appendChild(box);
    } else {
        var playerElement = document.createElement('a-box');
        playerElement.setAttribute('material', 'envMap: #smile;');
        playerElement.setAttribute('position', player.position);
        var face = document.createElement('a-plane');
        face.setAttribute('src', '#smile');
        face.setAttribute('position', '0 0 -0.51');
        face.setAttribute('rotation', ' 0 180 0');
        playerElement.appendChild(face);
    }

    playerElement.setAttribute('id', player.id);

    return playerElement;
}

function initPlayerElementsWithPlayers(players, targetElement) {
    for (var playerID in players) {
        var pe = playerElement(players[playerID]);
        targetElement.appendChild(pe);
    }
}

function initPlayerElement(targetElement, player) {
    var pe = playerElement(player) 
    targetElement.appendChild(pe);
}

AFRAME.registerComponent('update-movement', {
    tick: function () {
        var elPosition = this.el.getAttribute('position');
        var elRotation = this.el.getAttribute('rotation');
        if (elPosition.x != window.player.position.x || elPosition.z != window.player.position.z || elRotation.x != window.player.rotation.x || elRotation.y != window.player.rotation.y || elRotation.z != window.player.rotation.z) {
            window.player.position = elPosition;
            window.player.rotation = elRotation;
            socket.emit('update', window.player);
        }
    }
});
