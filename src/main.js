import aframe from 'aframe'
import socketio from 'socket.io-client'
import Player from './player'
import Util from './util'

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

let localStream
let connectedCall

window. players = {}
window. dataConnections = {}
let socket = require('socket.io-client')()
let player
let peer

socket.on('connect', function(){
    connectedServer()
})

socket.on('update', function(other){
    updateOther(other)
})

socket.on('init_players', function (players){
    window.players = players
    Util.initPlayerElementsWithPlayers(window.player, players, document.getElementById('player-area'))
})

socket.on('logout_other', function (other){
    let oe = document.getElementById(other.id)
    oe.parentNode.removeChild(oe)
})

function connectedServer() {
    window.peer = new Peer({ key: 'f42387e2-4c9f-4951-bce2-cc7802643eba', debug: 1})

    window.peer.on('open', function(){
        window.player = new Player(window.peer.id)
        socket.emit('login', window.player)
    })

    window.peer.on('call', function(call){
        connectedCall = call
        call.answer(localStream)

        call.on('stream', function(stream){
            console.log('id: ' + call.peer + ' にcallされて繋がったよ！')
            let audio = Util.audioElementWithPeerID(call.peer)
            audio.srcObject = stream
            audio.play()
            document.getElementById('audio-area').appendChild(audio)
        })
    })

    window.peer.on('connection', function (conn) {
        console.log('data connection kitaayo!!')
        console.log(conn)
    })

    navigator.getUserMedia({audio: true, video: false}, function(stream){
        localStream = stream
    }, function() { alert('Error!') })
}

function updateOther(other) {
    players[other.id] = other
    let otherElement = document.getElementById(other.id)
    if (otherElement == null) {
        Util.initPlayerElement(document.getElementById('player-area'), window.player, other)

        let peerId = other.id
        let call = window.peer.call(peerId, localStream)

        call.on('stream', function(stream){
            console.log('id: ' + peerId + ' にcallして繋がったよ！')
            let audio = Util.audioElementWithPeerID(peerId)
            audio.srcObject = stream
            audio.play()
            document.getElementById('audio-area').appendChild(audio)
        })

        console.log('data tsunagi masu')
        let dataConnection = window.peer.connect(peerId)

        dataConnection.on('open', function () {
            window.dataConnections[peerId] = dataConnection
            console.log("open data connection!!")
            console.log(window.dataConnections)
        })

        dataConnection.on('data', function (data) {
            console.log('data kitayo')
            console.log(data)
        })

        dataConnection.on('error', function (error) {
            console.log(error);
        })

    } else {
        otherElement.setAttribute('position', other.position)
        otherElement.setAttribute('rotation', other.rotation)
    }
}

AFRAME.registerComponent('update-movement', {
    tick: function () {
        let elPosition = this.el.getAttribute('position')
        let elRotation = this.el.getAttribute('rotation')
        if (elPosition.x != window.player.position.x || elPosition.z != window.player.position.z || elRotation.x != window.player.rotation.x || elRotation.y != window.player.rotation.y || elRotation.z != window.player.rotation.z) {
            window.player.position = elPosition
            window.player.rotation = elRotation
            // socket.emit('update', window.player)
            for (let peerID in window.dataConnections) {
                let connection = window.dataConnections[peerID]
                connection.send(window.player.flatObject)
                console.log(window.player.flatObject);
                console.log("data soushin!!")
            }
        }
    }
})
