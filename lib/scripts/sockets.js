var socketListeners = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    console.log('A new client connected: ' + socket.id);

    socket.on('main-room', function() {
      socket.join('mainRoom', function() {
        console.log(io.nsps['/'].adapter.rooms['mainRoom']);
        socket.emit('join-room', 'mainRoom');
      });
    });

    socket.on('leave-main', function() {
      console.log("socket left mainRoom: " + socket.id);
      socket.leave('mainRoom');
    });
    
    socket.on('new-post', function(data) {
      var mainRoom = io.nsps['/'].adapter.rooms['mainRoom']
      io.to('mainRoom').emit('new-post', data);
      if((!!mainRoom && !(socket.id in mainRoom)) || !mainRoom) {
        socket.emit('new-post', data);
      }
    });

    socket.on('delete-post', function(_id) {
      io.sockets.emit('delete-post', _id);
    });

    socket.on('disconnect', function() {
      console.log('Client disconnected: ' + socket.id);
    });
  });
}

module.exports = socketListeners;