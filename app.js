var express = require('express');
var path = require('path');
var app = express();
var httpServer;
var io;
var playerNum = 0;
var inputFlag = new Array(2);

init();

function init(){
    app.use(express.static(path.join(__dirname, 'public')));
    httpServer = app.listen(3000);
    io = require('socket.io').listen(httpServer);
    for(var i=0; i<2; i++){
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
    if(playerNum===2){
        io.sockets.emit('startGame');
        console.log('start game.');
    }

    socket.on('sendCommand',function(data){
        console.log('accept command. player id ='+socket.playerId+'.hand = '+data.hand);
        inputFlag[socket.playerId] = true;
        if(inputFlag[0]===true && inputFlag[1]===true){
            console.log('input complete.');
        }
    });
});