enchant();
var PICT_PREFIX = '/images/';
var PICT_JANKEN = PICT_PREFIX + 'janken.png';
var core;
var socket;
var messageLabel;
var rockSprite;
var scissorsSprite;
var paperSprite;

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
    rockSprite.frame = 0;
    rockSprite.x = 0;
    rockSprite.y = 352;
    rockSprite.visible = false;
    rockSprite.addEventListener(Event.TOUCH_END,function(){
        sendCommand('rock');
    });
    core.rootScene.addChild(rockSprite);

    scissorsSprite = new Sprite(128,128);
    scissorsSprite.image = core.assets[PICT_JANKEN];
    scissorsSprite.frame = 1;
    scissorsSprite.x = 96;
    scissorsSprite.y = 252;
    scissorsSprite.visible = false;
    core.rootScene.addChild(scissorsSprite);

    paperSprite = new Sprite(128,128);
    paperSprite.image = core.assets[PICT_JANKEN];
    paperSprite.frame = 2;
    paperSprite.x = 192;
    paperSprite.y = 352;
    paperSprite.visible = false;
    core.rootScene.addChild(paperSprite);

    loginServer();
}

function loginServer(){
    socket = io.connect(location.origin);
    socket.on('loginSuccess',function(data){
        messageLabel.text = '対戦相手のログイン待ち';
        console.log('player id is '+data.playerId);
    });
    socket.on('startGame',startGame);
}

function startGame(){
    messageLabel.visible = false;
    rockSprite.visible = true;
    scissorsSprite.visible = true;
    paperSprite.visible = true;
}

function sendCommand(hand){
    socket.emit('sendCommand',{
        hand : hand
    });
}