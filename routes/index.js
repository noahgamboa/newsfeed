var soundcloud = require('../lib/soundcloud.js');
var flickr = require('../lib/flickr.js');
var youtube = require('../lib/youtube.js');
var Post = require('../models/post.js');

module.exports = function(app) {
  /* Renders the newsfeed landing page. */
  app.get('/', function(request, response) {
	  response.render('index.html');
  });

  //this will be a search request to all three apis. when a user searches, this function
  //gets the value from the apis and returns the first result of each to the user (homie)
  app.get('/search', function(request, response) {
	  var search = request.query.query;
	  if(!search) {
		  //send error to the user
		  response.send('you need to specify a search term, homie', 422);
	  }
	  else {
		  //begin our search
		  var returnArray = [];

		  searchAPI(search, soundcloud, returnArray, "soundcloud");
		  searchAPI(search, flickr, returnArray, "flickr");
		  searchAPI(search, youtube, returnArray, "youtube");

		  //we need to have an interval because loading time
		  setInterval(function() {
		      if (returnArray.length >= 3) {
		    	  response.json(200, returnArray);
				  clearInterval(this);
		      }
		  }, 100);
	  }
  });
  //this handy function searches the api and then returns the first result
  function searchAPI(search, API, returnArray, apiName) {
	  API.search(search, function(error, body) {
		  if(error) throw error;
		  else {
			  var result = body[0];
			  result.api = apiName;
			  returnArray.push(result);
		  }
	  });
  }

  //return all the posts
  app.get('/posts', function(request, response) { 
	  Post.find(function(error, posts) {
		  if(error) response.send(error, 500);
		  response.json(200, posts);
	  });
  });
  //add a new post to the database
  app.post('/posts', function(request, response) { 
	  if(!request.body.api || !request.body.source || !request.body.title) response.json(404, "you need to specify an api, source, and title");
	  else {
		  //create a new post variable from the request starting with zero upvotes
		  var newPost = new Post({
			  api: request.body.api,
			  source: request.body.source,
			  title: request.body.title,
			  upvotes: 0
		  });
		  //save dat joint
		  newPost.save(function(error) {
			  if(error) response.send(error, 500);
			  else response.json(200, newPost);
		  });
	  }
  });
  //remove a post from the database
  app.post('/posts/remove', function(request, response) {
	  var id = request.body.id;
	  //amateur client didn't specify an id
	  if(!id) response.send("you need to specify an id", 422); 
	  Post.findById(id, function(error, post) {
		  if(error) response.send("the id you specified was not found", 404); 
		  //if we find the post we wanted, remove it
		  post.remove(function(error) {
			  if(error) response.send(error, 500);
			  else response.send(200);
		  });
	  });
  });
  //upvote a post in the database
  app.post('/posts/upvote', function(request, response) {
	  var id = request.body.id;
	  if(!id) response.send("you need to specify an id", 422); 
	  Post.findById(id, function(error, post) {
		  if(error) {
			  response.send("the id you specified was not found", 404);
		  }
		  else {
			  //if we find a post we wanted, upvote it, then save it and return to the user
			  post.upvotes++;
			  post.save(function(error) {
				  if(error) response.send(error, 500);
				  else response.json(200, post);
			  });
		  }
	  });
  });
};


