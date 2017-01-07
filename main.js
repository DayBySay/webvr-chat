var playerIDs = ["hoge", "fuga"];
var players = new Object;

function Player(id) {
    this.id = id;
    this.position = {"x": 0, "y": 0, "z": 0};
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
    var playerElement = document.createElement("a-box");
    playerElement.setAttribute("position", player.position);

    if (player.id == "hoge") {
        var camera = document.createElement("a-camera");
        var cursor = document.createElement("a-cursor");

        camera.appendChild(cursor);
        playerElement.appendChild(camera);
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
        // initPlayerElementsWithPlayers(players, this.el);
    }
});


AFRAME.registerComponent('cursor-listener', {
    init: function () {
        this.el.addEventListener("click", function(evt) {
            var cube = document.createElement("a-box");
            cube.setAttribute("position", "10 0 0");
            console.log(cube);
            var scene = document.getElementById("scene");
            console.log(scene);
            scene.appendChild(cube);
            console.log("uhouho");
        });
    }
});
