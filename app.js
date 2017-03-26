var express = require('express'),
  config = require('./config/config');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var allClients = [];
io.on('connection', function(socket){
  allClients.push(socket);
  socket.broadcast.emit('user.connected', allClients.length);
  socket.emit('user.connected', allClients.length);

  socket.on('button.pressed', function(msg){
    socket.broadcast.emit('sound.play', msg);
  });

  socket.on('disconnect', function() {

    var i = allClients.indexOf(socket);
    allClients.splice(i, 1);
    socket.broadcast.emit('user.disconnected', allClients.length);

  });

});



module.exports = require('./config/express')(app, config);

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

