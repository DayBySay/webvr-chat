export default class UserService {
    constructor(userId) {
        this.playerId = userId
		this.users = new Object
    }

	isPlayer(user) {
		return user.playerId === user.id
	}
}
