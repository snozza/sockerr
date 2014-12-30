var expect = require('chai').expect;
var Post = require('../lib/models/Post');

describe('#create()', function() {

  it('can be saved', function(done) {
    new Post({body: "Hello There"}).save(done);
  });

});
