var playerIDs = ["hoge", "fuga"];
var players = new Object;

function Player(id) {
    this.id = id;
    this.position = {"x": 0, "y": 1, "z": 0};
    this.shown = false;
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
    return player;
}

function playerElement(player) {
    var playerElement;

    if (player.id == "hoge") {
        playerElement = document.createElement("a-camera");
        var box = document.createElement("a-box");
        var cursor = document.createElement("a-cursor");

        playerElement.appendChild(cursor);
        playerElement.appendChild(box);
    } else {
        var playerElement = document.createElement("a-box");
        playerElement.setAttribute("position", player.position);
    }

    return playerElement;
}

function initPlayerElementsWithPlayers(players, targetElement) {
    for (var playerID in players) {
        var pe = playerElement(players[playerID]);
        targetElement.appendChild(pe);
    }
}

AFRAME.registerComponent('make-players', {
    init: function () {
        players =  playersWithPlayerIDs(playerIDs);
        initPlayerElementsWithPlayers(players, this.el);
    }
});


