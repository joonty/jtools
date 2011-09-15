/**
 * This object holds information about an individual jQuery selector element.
 *
 * Each section of the selector is made available in this object, rather than
 * keeping it as a single string.
 *
 * @class Represents a jQuery selector
 *
 * @param {String} tag The element tag name
 */
function pathObject(tag) {
	this.tag = tag;
	this.tagEnabled = true;
	this.id;
	this.idEnabled = true;
	this.classes = [];
	this.disabledClasses = [];
}

pathObject.prototype = {
	/**
	 * Get the object as a string, in jQuery selector format.
	 *
	 * E.g. returns div#myid.myclass1.myclass2
	 */
	string: function() {
		if (this.tagEnabled) {
			return this.tag + (this.idEnabled && this.id ? '#'+this.id : '') + this.classesToString();
		}
		return null;
	},
	classesToString: function() {
		var str = '';
		
		for (var i=0; i<this.classes.length; i++) {
			if (!in_array(this.disabledClasses,i)) {
				str += '.'+this.classes[i];
			}
		}
		return str;
	},
	addClassString: function(cls) {
		var cls_r = cls.split(' ');
		for (var i=0; i<cls_r.length; i++) {
			if (cls_r[i].length && cls_r[i].substr(0,6) != 'jtools') {
				this.classes.push(cls_r[i]);
			}
		}
	},
	toggleClass: function(idx) {
		if (!in_array(this.disabledClasses,idx)) {
			this.disabledClasses.push(idx);
		} else {
			var new_r = [];
			for (var i=0; i<this.disabledClasses.length; i++) {
				if (this.disabledClasses[i] != idx) {
					new_r.push(this.disabledClasses[i]);
				}
			}
			this.disabledClasses = new_r;
		}
	}
}