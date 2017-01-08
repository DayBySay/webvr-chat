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
}
