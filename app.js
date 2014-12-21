var express = require('express');
var path = require('path');
var app = express();
var httpServer;
var io;

app.use(express.static(path.join(__dirname, 'public')));
httpServer = app.listen(3000);
io = require('socket.io').listen(httpServer);

io.sockets.on('connection',function(socket){
    console.log('connection success.');
});