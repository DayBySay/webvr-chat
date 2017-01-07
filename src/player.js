var Player = function Player(id) {
    this.id = id;
    this.position = {"x": 0, "y": 1.6, "z": 0};
    this.rotation = {"x": 0, "y": 0, "z": 0};
}

Player.prototype.element = function (p) {
    var pe;

    if (p.id == this.id) {
        pe = player(p);
    } else {
        pe = other(p);
    }

    pe.setAttribute("id", player.id);

    return pe;
}

function player(player) {
    var pe = document.createElement("a-camera");
    pe.setAttribute("update-movement", "");
    var box = document.createElement("a-box");
    box.appendChild(face());
    var cursor = document.createElement("a-cursor");

    pe.appendChild(cursor);
    pe.appendChild(box);
    return pe;
}

function other(player) {
    var pe = document.createElement("a-box");
    pe.setAttribute("material", "envMap: #smile;");
    pe.setAttribute("position", player.position);
    pe.appendChild(face());
    return pe;
}

function face() {
    var face = document.createElement("a-plane");
    face.setAttribute("src", "#smile");
    face.setAttribute("position", "0 0 -0.51");
    face.setAttribute("rotation", " 0 180 0");
    return face;
}

module.exports = Player;
