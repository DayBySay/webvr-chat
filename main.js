var playerIDs = ["hoge", "fuga"];
var players = new Object;

function Player(id) {
    this.id = id;
    this.loc = {"x": 0, "y": 0, "z": 0};
}

function playersWithPlayerIDs(playerIDs) {
    var players = new Object;
    playerIDs.forEach(function (val, index, arr) {
        var player = createPlayerWithPlayerID(val);
        players[val] = player;
    });

    return players;
}

function createPlayerWithPlayerID(id) {
    var player = new Player(id);
    console.log(player);
    return player;
}

AFRAME.registerComponent('make-players', {
    init: function () {
        players =  playersWithPlayerIDs(playerIDs);
    }
});

