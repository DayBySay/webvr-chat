const audioAreaSuffix = 'audio'

export default class Util {

    static audioElementWithPeerID(peerID) {
        let ae = document.getElementById(this.audioAreaSuffix + peerID)
        if (ae == null) {
            ae = document.createElement('a-sound')
			ae.setAttribute("autoplay", true) 
            ae.setAttribute('id', this.audioAreaSuffix + peerID)
        }

        return ae
    }
}
