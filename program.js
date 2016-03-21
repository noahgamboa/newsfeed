var fs = require('fs');
var buf = fs.readdir(process.argv[2], function(error, list) {
	if(error) console.log(error);
	else {
		var remainingArr = list.filter(function(element) {
			return element.indexOf(process.argv[3]) > -1 && element != process.argv[3];
		});
		remainingArr.forEach(function(elem) {
			console.log(elem);
		});
	}
});

