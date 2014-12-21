var express = require('express');
var path = require('path');
var app = express();
var httpServer;
var io;
var playerNum = 0;

app.use(express.static(path.join(__dirname, 'public')));
httpServer = app.listen(3000);
io = require('socket.io').listen(httpServer);

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
    });

});