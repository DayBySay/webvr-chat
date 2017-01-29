import User from './user'

export default class UserService {
    constructor(userId) {
        this.player = new User(userId)
		this.users = new Object
    }

	userArea() {
		let userArea = document.getElementById('user-area')
		return userArea
	}

	isPlayer(user) {
		return this.player.id === user.id
	}

	shouldUpdatePlayerData(position, rotation) {
        if (position.x != this.player.position.x || position.z != this.player.position.z || rotation.x != this.player.rotation.x || rotation.y != this.player.rotation.y || rotation.z != this.player.rotation.z) {
            this.player.position = position
            this.player.rotation = rotation

			return true
        }

		return false
	}

    initUserArea() {
		this.initUserElementsWithUsers()	
    }

    initUserElementsWithUsers() {
        for (let userId in this.users) {
			let user = this.users[userId]
            let ue
			if (this.isPlayer(user)) {
				ue = User.playerElement(user)
			} else {
				ue = User.otherElement(user)
			}

            this.userArea().appendChild(ue)
        }
    }

	initOther(user) {
		let oe
		oe = User.otherElement(user)
		this.userArea().appendChild(oe)
	}

	updateOther(other) {
		this.users[other.id] = other
		let otherElement = document.getElementById(other.id)
		otherElement.setAttribute('position', other.position)
		otherElement.setAttribute('rotation', other.rotation)
	}

	logoutOther(other) {
		let oe = document.getElementById(other.id)
		oe.parentNode.removeChild(oe)
	}

	userWithPeerId(id) {
		return document.getElementById(id)
	}
}
