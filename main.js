AFRAME.registerComponent('make-players', {
    init: function () {
        makePlayers();
    }
});

var playerIDs = ["hoge", "fuga"];
var Players = new Object;

function makePlayers() {
    playerIDs.forEach(function (val, index, arr) {
        var player = makePlayer(val);
        Players[val] = player;
    });
}

function makePlayer(name) {
    var player = new Player(name);
    console.log(player);
    return player;
}

function Player(name) {
    this.name = name;
    this.loc = {"x": 0, "y": 0, "z": 0};
}
