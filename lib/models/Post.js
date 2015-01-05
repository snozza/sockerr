var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  body: {type : String, default: '', trim : true},
  createdAt: {type : Date, default: Date.now},
  full_name: {type : String, default: ''},
  username: {type : String, default: ''}
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;