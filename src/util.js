const audioAreaSuffix = 'audio'

export default class Util {

	static playerArea() {
		let playerArea = document.getElementById('player-area')
		return playerArea
	}

    static audioElementWithPeerID(peerID) {
        let ae = document.getElementById(this.audioAreaSuffix + peerID)
        if (ae == null) {
            ae = document.createElement('audio')
            ae.setAttribute('id', this.audioAreaSuffix + peerID)
        }

        return ae
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
		this.initPlayerElementsWithPlayers(player, players, this.playerArea())
    }

    static initPlayerElementsWithPlayers(player, players, targetElement) {
        for (let playerID in players) {
            let pe
			if (playerID == player.id) {
				pe = this.me(player)
			} else {
				pe = this.other(player)
			}

            targetElement.appendChild(pe)
        }
    }

	static initOther(other) {
		let pe
		pe = this.other(other)
		targetElement.appendChild(pe)
	}

	static updateOther(other) {
		players[other.id] = other
		let otherElement = document.getElementById(other.id)
		otherElement.setAttribute('position', other.position)
		otherElement.setAttribute('rotation', other.rotation)
	}
}
