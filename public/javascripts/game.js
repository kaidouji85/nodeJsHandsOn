enchant();
var core;
var socket;
var messageLabel;

window.onload = function() {
    core = new Core(320, 480);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.onload = initGame;
    core.start();
};

function initGame(){
    messageLabel = new Label('サーバログイン中');
    messageLabel.color = 'white';
    core.rootScene.addChild(messageLabel);
    loginServer();
}

function loginServer(){
    socket = io.connect(location.origin);
    socket.on('loginSuccess',function(data){
        messageLabel.text = '対戦相手のログイン待ち'
        console.log('player id is '+data.playerId);
    });
}