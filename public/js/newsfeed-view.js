(function(window, document, undefined) {
  var NewsfeedView = {};
  var $error = $(".error");

  /* Renders the newsfeed into the given $newsfeed element. */
  NewsfeedView.render = function($newsfeed) {
	  PostModel.loadAll(function(error, posts) {
		  if(error) $error.html(error); 
		  posts.forEach(function(post) { 
			  NewsfeedView.renderPost($newsfeed, post, false);
			  $newsfeed.imagesLoaded(function() {
				  $newsfeed.masonry({
					  columnWidth: '.post',
					  itemSelector: '.post'
				  });
			  });
		  });
	  });
  };

  /* Given post information, renders a post element into $newsfeed. */
  NewsfeedView.renderPost = function($newsfeed, post, updateMasonry) {
	var postSource = $("#newsfeed-post-template").html();
	var template = Handlebars.compile(postSource);
	var html = template({
		title: post.title,
		api: post.api,
		upvotes: post.upvotes,
		source: post.source
	});
	var $post = $(html);
	$newsfeed.prepend($post);
	
	$post.find(".remove").click(function() {
		PostModel.remove(post._id, function(error) {
			if(error) $error.html(error); 
			else {
				$newsfeed.masonry('remove', $post);
				$newsfeed.masonry();
			}
		});
	});

	$post.find(".upvote").click(function() {
		PostModel.upvote(post._id, function(error, post) {
			if(error) $error.html(error); 
			else $post.find(".upvote-count").html(post.upvotes);
		});
	});

	if (updateMasonry) {
      $newsfeed.imagesLoaded(function() {
        $newsfeed.masonry('prepended', $post);
      });
    }
  };

  window.NewsfeedView = NewsfeedView;
})(this, this.document);
