var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  body: {type : String, default: '', trim : true},
  createdAt: {type : Date, default: Date.now}
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;