const audioAreaSuffix = 'audio'

export default class Util {

    static audioElementWithPeerID(peerID) {
        let ae = document.getElementById(this.audioAreaSuffix + peerID)
        if (ae == null) {
            ae = document.createElement('audio')
            ae.setAttribute('id', this.audioAreaSuffix + peerID)
        }

        return ae
    }
}
