function pathContainer() {
	this.r = [];
}

pathContainer.prototype = {
	prepend: function(pathObject) {
		this.r.unshift(pathObject);
	},
	string: function() {
		var str = '';
		for (var i=0; i<this.r.length; i++) {
			var o_str = this.r[i].string();
			if (o_str) {
				str +=  o_str+' ';
			}
		}
		return str.trim();
	}
}