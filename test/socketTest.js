var expect = require('chai').expect
var socket = require('socket.io');
var io = require('socket.io-client');

describe('Server receives and actions socket emissions', function() {

  var options = {
    'transports' : ['websocket'],
    'forceNew': true //Just incase you want to connect multiple sockets
  };

  it('responds by echoing the client emission', function(done) {
    var socket = io.connect(process.env.URL, options);
      socket.on('new-post', function(data) {
        expect(data).to.eql('testData');
        done();
      });
      socket.emit('new-post', 'testData');
  });

  it('should join mainRoom upon emission', function(done) {
    var socket = io.connect(process.env.URL, options);
    socket.on('join-room', function(data) {
      expect(data).to.eql('mainRoom');
      socket.disconnect();
      done();
    });
    socket.emit('main-room');
  });

  it('should emit delete-post with id', function(done) {
    var socket = io.connect(process.env.URL, options);
    socket.on('delete-post', function(_id) {
      expect(_id).to.exist
      socket.disconnect();
      done();
    });
    socket.emit('main-room');
    socket.emit('delete-post', '12345');
  });

});