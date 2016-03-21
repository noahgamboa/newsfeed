(function(window, document, undefined) {
  var SearchModel = {};

  var SEARCH_URL = '/search';
  var STATUS_OK = 200;

  /**
   * Loads API search results for a given query.
   *
   * Calls: callback(error, results)
   *  error -- the error that occurred or NULL if no error occurred
   *  results -- an array of search results
   */
  SearchModel.search = function(query, callback) {
	//create all dem requests
	var searchRequest = new XMLHttpRequest();
	searchRequest.addEventListener("load", function() {
		if(searchRequest.status !== STATUS_OK) {
			callback(searchRequest.responseText);
		} else {
			//response from server was good! swag out with the callback
			var response = JSON.parse(searchRequest.responseText);
			callback(null, response);
		}
	});
	var searchParams = "?query=" + encodeURIComponent(query);
	searchRequest.open('GET', SEARCH_URL + searchParams);
	searchRequest.send();
  };

  window.SearchModel = SearchModel;
})(this, this.document);
