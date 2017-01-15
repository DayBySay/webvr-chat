const audioAreaSuffix = 'audio'
const playerArea = document.getElementById('player-area')

export default class Util {

    static audioElementWithPeerID(peerID) {
        let ae = document.getElementById(audioAreaSuffix + peerID)
        if (ae == null) {
            ae = document.createElement('audio')
            ae.setAttribute('id', audioAreaSuffix + peerID)
        }

        return ae
    }

    static playerElementWithInitializedPlayer(player, initilizedPlayer) {
        let playerElement

        if (initilizedPlayer.id == player.id) {
            playerElement = this.me(initilizedPlayer)
        } else {
            playerElement = this.other(initilizedPlayer)
        }

        return playerElement
    }

    static me(player) {
        let playerElement
        playerElement = document.createElement('a-camera')
        playerElement.setAttribute('update-movement', '')
        let box = document.createElement('a-box')
        box.appendChild(this.face())
        let cursor = document.createElement('a-cursor')

        playerElement.appendChild(cursor)
        playerElement.appendChild(box)
        playerElement.setAttribute('id', player.id)
        return playerElement
    }

    static other(player) {
        let playerElement
        playerElement = document.createElement('a-box')
        playerElement.setAttribute('material', 'envMap: #smile')
        playerElement.setAttribute('position', player.position)
        playerElement.setAttribute('rotation', player.rotation)
        playerElement.appendChild(this.face())
        playerElement.setAttribute('id', player.id)
        return playerElement
    }

    static face() {
        let face = document.createElement('a-plane')
        face.setAttribute('src', '#smile')
        face.setAttribute('position', '0 0 -0.51')
        face.setAttribute('rotation', ' 0 180 0')
        return face
    }

    static initPlayerArea(player, players) {
		this.initPlayerElementsWithPlayers(player, players, playerArea)
    }

    static initPlayerElementsWithPlayers(player, players, targetElement) {
        for (let playerID in players) {
            let pe = this.playerElementWithInitializedPlayer(player, players[playerID])
            console.log(pe)
            targetElement.appendChild(pe)
        }
    }

    static initPlayerElement(targetElement, player) {
        let pe = this.playerElementWithInitializedPlayer(players, player) 
        console.log(pe)
        targetElement.appendChild(pe)
    }

	static updateOther(other) {
		players[other.id] = other
		let otherElement = document.getElementById(other.id)
		otherElement.setAttribute('position', other.position)
		otherElement.setAttribute('rotation', other.rotation)
	}
}
