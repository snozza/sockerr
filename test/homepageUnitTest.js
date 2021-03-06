var server = require('../app');
var expect = require('chai').expect;
var http = require('http');
var dbCleaner = require('./helpers/dbCleaner')

describe('Working Homepage', function() {

  it('has a success status code for homepage', function(done) {
    http.get('http://localhost:3000', function(res) {
      expect(res.statusCode).to.eql(200);
      done();
    });
  });

  it('has an error status for incorrect routes', function(done) {
    http.get('http://localhost:3000/foo', function(res) {
      expect(res.statusCode).to.eql(404);
      done();
    });
  });

});