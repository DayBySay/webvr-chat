import aframe from 'aframe'
import UserService from './UserService'
import socketio from 'socket.io-client'
import Util from './util'

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

let localStream
let connectedCall

let userService
let socket = require('socket.io-client')()
let peer

socket.on('connect', function(){
    connectedServer()
})

socket.on('init_users', function (users){
    window.userService.users = users
	window.userService.initUserArea()
})

socket.on('init_other', function(other) {
	initOther(other)
})

socket.on('update_other', function(other){
    Uti.lupdateOther(other)
})

socket.on('logout_other', function (other){
    let oe = document.getElementById(other.id)
    oe.parentNode.removeChild(oe)
})

function connectedServer() {
    window.peer = new Peer({ key: 'f42387e2-4c9f-4951-bce2-cc7802643eba', debug: 1})

    window.peer.on('open', function(){
		window.userService = new UserService(window.peer.id)
        socket.emit('login', window.userService.player)
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

    navigator.getUserMedia({audio: true, video: false}, function(stream){
        localStream = stream
    }, function() { alert('Error!') })
}

function initOther(other) {
	window.userService.initOther(other)

	let peerId = other.id
	let call = window.peer.call(peerId, localStream)

	call.on('stream', function(stream){
		console.log('id: ' + peerId + ' にcallして繋がったよ！')
		let audio = Util.audioElementWithPeerID(peerId)
		audio.srcObject = stream
		audio.play()
		document.getElementById('audio-area').appendChild(audio)
	})
}

AFRAME.registerComponent('update-movement', {
    tick: function () {
        let elPosition = this.el.getAttribute('position')
        let elRotation = this.el.getAttribute('rotation')
		if (window.userService.shouldUpdatePlayerData(elPosition, elRotation)) {
            socket.emit('update', window.userService.player)
		}
    }
})
