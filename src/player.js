import flat from 'flat'

export default class Player {
    constructor(id) {
        this.id = id
        this.position = {'x': 0, 'y': 1.6, 'z': 0}
        this.rotation = {'x': 0, 'y': 0, 'z': 0}
    }

    get flatObject() {
        return flat(this)
    }
}
