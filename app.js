var express = require('express'),
  config = require('./config/config');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('button.pressed', function(msg){
    console.log('button pressed: ' + msg);
    socket.broadcast.emit('sound.play', msg);
    console.log("BROADCAST");
  });

});



module.exports = require('./config/express')(app, config);

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

