var expect = require('chai').expect
var socket = require('socket.io');
var io = require('socket.io-client');

describe('Server should receive and action socket emissions', function() {

  var options = {
    'transports' : ['websocket'],
    'forceNew': true
  };

  it('should emit new-post with data', function(done) {
    var socket = io.connect(process.env.URL, options);
      socket.on('new-post', function(data) {
        expect(data).to.eql('testData');
        done();
      });
      socket.emit('new-post', 'testData');
  });

  it('should emit delete-post with id', function(done) {
    var socket = io.connect(process.env.URL, options);
    socket.on('delete-post', function(_id) {
      expect(_id).to.exist
      socket.disconnect();
      done();
    });
    socket.emit('delete-post', '12345');
  });

});