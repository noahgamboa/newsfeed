var request = require('request');

var YT_URL = 'https://www.googleapis.com/youtube/v3/search';
var YT_API_KEY = 'AIzaSyDDP01Gnj3-wfoqM59xQz6pryJQhmYWCt8';
var YT_EMBED_URL = 'http://www.youtube.com/embed/';

/**
 * Queries YouTube for tracks that match the given query
 * 
 * @param query - the search query to send to YouTube
 *
 * Calls @param callback(error, results):
 *  error -- the error that occurred or null if no error
 *  results -- if error is null, contains the search results
 */
exports.search = function(query, callback) {
	var params = {
		key: YT_API_KEY,
		q: query,
		part: 'snippet',
		type: 'video'
	}
	//get the request from youtube
	request.get({
		url: YT_URL,
		qs: params
	}, function(error, response, body) {
		//handle all dem errors
		if(error) {
			callback(error);
		} else if(response.statusCode !== 200) {
			callback("bad status code: " + response.statusCode);
		} else {
			//use youtube's response and format it the way we want it, call the callback
			var obj = JSON.parse(body);
			var returnArray = [];
			obj.items.forEach(function(object) {
				var returnObject = {
					title: object.snippet.title,
					source: YT_EMBED_URL + object.id.videoId
				}
				returnArray.push(returnObject);
			});
			callback(null, returnArray);
		}
	});
};
