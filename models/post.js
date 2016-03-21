var mongoose = require('mongoose');

//create that schema, the model that represents the data that is stored
var postSchema = mongoose.Schema({
	api: String,
	source: String,
	title: String,
	upvotes: Number
});

//now have mongoose model our post and send it to exports
var Post = mongoose.model('Post', postSchema);
module.exports = Post;
