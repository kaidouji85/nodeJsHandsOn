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
    console.log('player'+playerNum+' connection success.');
    socket.emit('loginSuccess',{
        playerId : playerNum
    });
    playerNum++;
    if(playerNum===2){
        io.sockets.emit('startGame');
        console.log('start game.');
    }
});