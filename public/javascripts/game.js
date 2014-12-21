enchant();
var core;
var socket;

window.onload = function() {
    core = new Core(320, 480);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.onload = initGame;
    core.start();
};

function initGame(){
    socket = io.connect(location.origin);
}