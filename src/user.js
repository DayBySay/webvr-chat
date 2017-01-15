export default class User {
    constructor(id) {
        this.id = id
        this.position = {'x': 0, 'y': 1.6, 'z': 0}
        this.rotation = {'x': 0, 'y': 0, 'z': 0}
    }

	static playerElement(user) {
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

	static otherElement(user) {
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
}
