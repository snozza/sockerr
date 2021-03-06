var expect = require('chai').expect;
var Post = require('../lib/models/Post');

describe('#create()', function() {

  it('can be saved', function(done) {
    new Post({body: "Hello There"}).save(done);
  });

  it('should have text', function(done) {
    new Post({body: "Hello Again!"}).save(function(err, createdPost) {
      expect(createdPost.body).to.eql("Hello Again!");
      done();
    });
  });

  it('should have a creation date', function(done) {
    new Post({body: "Hello Again!"}).save(function(err, createdPost) {
      expect(createdPost.createdAt).to.be.a('date');
      done();
    });
  });

  it('should be able to be deleted', function(done) {
    new Post({body: "This will be deleted!"}).save(function(err, createdPost) {
      Post.remove({body: "This will be deleted!"}, function() {
        Post.find({body: "This will be deleted!"}, function(err, post) {
          expect(post).to.be.empty;
          done();
        });
      });
    });
  });
});
