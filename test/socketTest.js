var expect = require('chai').expect;
var socket = require('socket.io');
var io = require('socket.io-client');

describe('Server should receive and action socket emissions', function() {

  var options = {
    'transports' : ['websocket'],
    'forceNew': true
  };

  it('should emit new-post', function(done) {
    var socket = io.connect(process.env.URL, options);
    socket.on('connect', function() {
      socket.on('new-post', function(data) {
        console.log(data);
        expect(data).to.eql('testData');
        socket.disconnect();
        done();
      });
      socket.emit('new-post', 'testData');
    });
  });
});