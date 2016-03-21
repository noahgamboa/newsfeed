var request = require('request');

var FLICKR_URL = 'https://api.flickr.com/services/rest/?';
var FLICKR_API_KEY = '3cffcc97867ea6aaf3d7fa2690f0ae10';
var STATUS_OK = 200;

/**
 * Queries Flickr for photos that match the given query.
 *
 * @param query -- the search query to send to Flickr
 *
 * Calls @param callback(error, results):
 *  error -- the error that occurred or null if no error
 *  results -- if error is null, contains the search results
 */
exports.search = function(query, callback) {
	var params = {
		api_key: FLICKR_API_KEY,
		text: query,
		method: 'flickr.photos.search',
		format: 'json',
		media: 'photos',
		sort: 'relevance',
		nojsoncallback: 1
	}

	//get requested search from flickr
	request.get({
		url: FLICKR_URL,
		qs: params
	}, function(error, response, body) {
		//handle errors if flickr's server wasn't cool
		if(error) {
			callback(error);
		} else if(response.statusCode !== 200) {
			callback("bad status code: " + response.statusCode);
		} else {
			//format and return flickr's data the way we want it
			var obj = JSON.parse(body);
			var returnArray = [];
			obj.photos.photo.forEach(function(photo) {
				var photoObj = {
					title: photo.title,
					source: "https://farm" + photo.farm.toString() + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_z.jpg"
				};
				returnArray.push(photoObj);
			});
			callback(null, returnArray);
		}
	});
};
