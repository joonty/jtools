jQuery.fn.extend({
	getPath: function( path ) {
		// The first time this function is called, path won't be defined.
		if ( typeof path == 'undefined' ) {
			path = '';
			var ft = true;
		} else {
			var ft = false;
		}

		// If this element is <html> we've reached the end of the path.
		if ( this.is('body')) {
			if (!ft) {
				return path;
			} else {
				return 'body';
			}
		}
		
		if (!this[0]) {
			return '';
		}
		// Add the element name.
		var cur = this[0].nodeName.toLowerCase();

		// Determine the IDs and path.
		var id = this.attr('id'), cls = this.attr('class');


		// Add the #id if there is one.
		if ( typeof id != 'undefined' && id.length)  {
			cur += '#' + id.replace(/([#;&,.+*~\':"!^$[\]()=>|\/])/g,'\\$1');
		}

		// Add any classes.
		if ( typeof cls != 'undefined' && cls.length && cls.substr(0,6) != 'jtools') {
			
			cur += '.' + cls.replace(/([#;&,.+*~\':"!^$[\]()=>|\/])/g,'\\$1').replace(/\s?jtools[^\s]*/,'').replace(/[\s\n]+/g,'.');
		}

		// Recurse up the DOM.
		return this.parent().getPath( ' ' + cur + path );
	}
});