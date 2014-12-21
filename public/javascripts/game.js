enchant();
var PICT_PREFIX = '/images/';
var PICT_JANKEN = PICT_PREFIX + 'janken.png';
var core;
var socket;
var messageLabel;
var rockSprite;

window.onload = function() {
    core = new Core(320, 480);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";

    preLoad();
    core.onload = initGame;
    core.start();
};

function preLoad(){
    core.preload(PICT_JANKEN);
}

function initGame(){
    messageLabel = new Label('サーバログイン中');
    messageLabel.color = 'white';
    core.rootScene.addChild(messageLabel);

    rockSprite = new Sprite(128,128);
    rockSprite.image = core.assets[PICT_JANKEN];
    core.rootScene.addChild(rockSprite);

    loginServer();
}

function loginServer(){
    socket = io.connect(location.origin);
    socket.on('loginSuccess',function(data){
        messageLabel.text = '対戦相手のログイン待ち';
        console.log('player id is '+data.playerId);
    });
    socket.on('startGame',function(){
        messageLabel.text = 'ゲーム開始';
    });
}