const audioAreaSuffix = 'audio'

export default class Util {

	static userArea() {
		let userArea = document.getElementById('user-area')
		return userArea
	}

    static audioElementWithPeerID(peerID) {
        let ae = document.getElementById(this.audioAreaSuffix + peerID)
        if (ae == null) {
            ae = document.createElement('audio')
            ae.setAttribute('id', this.audioAreaSuffix + peerID)
        }

        return ae
    }

    static me(user) {
        let userElement
        userElement = document.createElement('a-camera')
        userElement.setAttribute('update-movement', '')
        let box = document.createElement('a-box')
        box.appendChild(this.face())
        let cursor = document.createElement('a-cursor')

        userElement.appendChild(cursor)
        userElement.appendChild(box)
        userElement.setAttribute('id', user.id)
        return userElement
    }

    static other(user) {
        let userElement
        userElement = document.createElement('a-box')
        userElement.setAttribute('material', 'envMap: #smile')
        userElement.setAttribute('position', user.position)
        userElement.setAttribute('rotation', user.rotation)
        userElement.appendChild(this.face())
        userElement.setAttribute('id', user.id)
        return userElement
    }

    static face() {
        let face = document.createElement('a-plane')
        face.setAttribute('src', '#smile')
        face.setAttribute('position', '0 0 -0.51')
        face.setAttribute('rotation', ' 0 180 0')
        return face
    }

    static initUserArea(player, users) {
		this.inituserElementsWithusers(player, users, this.userArea())
    }

    static initUserElementsWithUsers(player, users, targetElement) {
        for (let user in users) {
            let ue
			if (user.id == player.id) {
				ue = this.me(player)
			} else {
				ue = this.other(player)
			}

            targetElement.appendChild(ue)
        }
    }

	static initOther(other) {
		let pe
		pe = this.other(other)
		targetElement.appendChild(pe)
	}

	static updateOther(other) {
		users[other.id] = other
		let otherElement = document.getElementById(other.id)
		otherElement.setAttribute('position', other.position)
		otherElement.setAttribute('rotation', other.rotation)
	}
}
