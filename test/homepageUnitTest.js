var server = require('../app');
var expect = require('chai').expect;
var http = require('http');

describe('Working Homepage', function() {

  it('should have status code off 200 for homepage', function(done) {
    http.get('http://localhost:3000', function(res) {
      expect(res.statusCode).to.eql(200);
      done();
    });
  });

  it('should have status code of 404 for incorrect routes', function(done) {
    http.get('http://localhost:3000/foo', function(res) {
      expect(res.statusCode).to.eql(404);
      done();
    });
  });

});