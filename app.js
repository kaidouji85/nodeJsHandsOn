var MAX_PLAYER_NUM = 2;
var express = require('express');
var path = require('path');
var app = express();
var httpServer;
var io;
var playerNum = 0;
var inputFlag = new Array(MAX_PLAYER_NUM);
var inputBuff = new Array(MAX_PLAYER_NUM);

init();

function init(){
    app.use(express.static(path.join(__dirname, 'public')));
    httpServer = app.listen(3000);
    io = require('socket.io').listen(httpServer);
    for(var i=0; i<MAX_PLAYER_NUM; i++){
        inputFlag[0] = false;
    }
}

io.sockets.on('connection',function(socket){
    socket.playerId = playerNum;
    console.log('player'+socket.playerId+' connection success.');

    socket.emit('loginSuccess',{
        playerId : socket.playerId
    });

    playerNum++;
    if(playerNum===MAX_PLAYER_NUM){
        io.sockets.emit('startGame');
        console.log('start game.');
    }

    socket.on('sendCommand',function(data){
        console.log('accept command. player id ='+socket.playerId+'.hand = '+data.hand);
        inputFlag[socket.playerId] = true;
        inputBuff[socket.playerId] = data;
        if(isCompleteInput()){
            console.log('input complete.');
            console.log(inputBuff);
        }
    });
});

function isCompleteInput(){
    for(var i=0; i<MAX_PLAYER_NUM; i++){
        if(inputFlag[i]===false){
            return false;
        }
    }
    return true;
}