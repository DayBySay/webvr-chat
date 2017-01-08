export default class Util {
    const audioAreaSuffix = 'saudio'

    static function audioElementWithPeerID(peerID) {
        let ae = document.getElementById(audioAreaSuffix + peerID)
        if (ae == null) {
            ae = document.createElement('audio')
            ae.setAttribute('id', audioAreaSuffix + peerID)
        }

        return ae
    }

    static function playerElementWithInitializedPlayer(player, initilizedPlayer) {
        let playerElement

        if (initilizedPlayer.id == player.id) {
            playerElement = me()
        } else {
            playerElement = other()
        }

        return playerElement
    }

    function me() {
        let playerElement
        playerElement = document.createElement('a-camera')
        playerElement.setAttribute('update-movement', '')
        let box = document.createElement('a-box')
        box.appendChild(face())
        let cursor = document.createElement('a-cursor')

        playerElement.appendChild(cursor)
        playerElement.appendChild(box)
        playerElement.setAttribute('id', player.id)
    }

    function other() {
        let playerElement
        playerElement = document.createElement('a-box')
        playerElement.setAttribute('material', 'envMap: #smile')
        playerElement.setAttribute('position', initilizedPlayer.position)
        playerElement.setAttribute('rotation', initilizedPlayer.rotation)
        playerElement.appendChild(face())
        playerElement.setAttribute('id', initilizedPlayer.id)
    }

    function face() {
        let face = document.createElement('a-plane')
        face.setAttribute('src', '#smile')
        face.setAttribute('position', '0 0 -0.51')
        face.setAttribute('rotation', ' 0 180 0')
        return face
    }
}
