jQuery.fn.extend({
	getPathObject: function( cont ) {
		// The first time this function is called, path won't be defined.
		if ( typeof cont == 'undefined' ) {
			cont = new pathContainer();
			var ft = true;
		} else {
			var ft = false;
		}

		// If this element is <html> we've reached the end of the path.
		if ( this.is('body')) {
			if (!ft) {
				return cont;
			} else {
				return cont.prepend(new pathObject('body'));;
			}
		}
		
		if (!this[0]) {
			return cont;
		}
		var o = new pathObject(this[0].nodeName.toLowerCase());
		// Add the element name.
		
		// Determine the IDs and path.
		var id = this.attr('id'), cls = this.attr('class');


		// Add the #id if there is one.
		if ( typeof id != 'undefined' && id.length)  {
			o.id = id.replace(/([#;&,.+*~\':"!^$[\]()=>|\/])/g,'\\$1');
		}

		// Add any classes.
		if ( typeof cls != 'undefined' && cls.length && cls.substr(0,6) != 'jtools') {
			o.addClassString(cls);
		}
		cont.prepend(o);

		// Recurse up the DOM.
		return this.parent().getPathObject( cont );
	}
});