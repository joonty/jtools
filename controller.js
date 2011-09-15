/**
 * The controller object, which creates event listeners and handles the GUI object.
 *
 * @class The main interface for jTools
 */
var controller = {
	gui: null,
	enabled: false,
	locked: false,
	current_tree: null,
	modified_tree: null,
	delete_mode: false,
	
	classes: {
		highlighted: 'jtools-highlighted',
		selected: 'jtools-selected',
		executed: 'jtools-executed'
	},
	
	init: function() {
		this.gui = new jtools_interface();
		this.gui.logo.click(function(){
			if (controller.enabled) {
				controller.disable();
			}else{
				controller.enable();
			}
		});
		chrome.extension.onRequest.addListener(this._request_exec);
		$('*').hover(function(e){
			if (controller.enabled && !controller.locked) {
				if (e.target !== this) {return;}
				var $e = $(this);
				if (this != controller.gui.el[0] && $e.parents('#'+controller.gui.id).length == 0) {
					$('.'+controller.classes.highlighted).removeClass(controller.classes.highlighted);
					$e.addClass(controller.classes.highlighted);
					controller.gui.show_path($e.getPath());
				}
			}
		}).click(function(e){
			if (controller.enabled) {
				if (controller.delete_mode) {
						if (e.target !== this) {
								return;
						}
						e.preventDefault();
						var path = $(this).removeClass('jquery-tools-outlined').getPath();
						$(this).remove();
						if (path) {
							storage += '|'+path;
							window.localStorage.setItem(window.location.host,storage);
						} else {
							alert("Failed to get path for element");
						}
						return true;
				}
				if (!controller.locked) {
					if (e.target !== this) {return;}
					
					$('.'+controller.classes.executed).removeClass(controller.classes.executed);
					var $e = $(this);
					if (this != controller.gui.el[0] && $e.parents('#'+controller.gui.id).length == 0) {
						$('.'+controller.classes.highlighted).removeClass(controller.classes.highlighted);
						$('.'+controller.classes.selected).removeClass(controller.classes.selected);
						e.preventDefault();
						$e.addClass(controller.classes.selected);
						var path = $e.getPath();
						controller.process_path($e);
						controller.exec(path);
						controller.lock($e);
					}
				} else {
					if (e.target !== this) {return;}
					if (this != controller.gui.el[0] && $(this).parents('#'+controller.gui.id).length == 0) {
						if (e.target != controller.locked[0]) {
							controller.locked.removeClass(controller.classes.selected);
							$('.'+controller.classes.executed).removeClass(controller.classes.executed);
							controller.unlock();
						}
					}
				}
			}
		});
	},
	
	disable: function() {
		this.enabled = false;
		this.gui.close();
	},
	
	enable: function() {
		this.enabled = true;
		this.gui.open();
	},
	
	lock: function($e) {
		this.locked = $e;
	},
	
	unlock: function() {
		this.locked = false;
	},
	
	_request_exec: function(request, sender, sendResponse) {
		if (request.action == "executeJQuerySelector") {
			sendResponse(controller.exec(request.selector));
		} else {
			sendResponse({}); // Send nothing..
		}
	},
	
	exec: function(selector) {
		console.log("Executing jQuery selector: "+selector);
		var response = {exec:false};
		if ($ == undefined) {
			throw new Error("jQuery has not been initialised!");
		}
		try {
			$('.'+controller.classes.executed).removeClass(controller.classes.executed);
			var els = $(selector);
			if (els.length) {
				els.each(function(){
					if (this != controller.gui.el[0] && $(this).parents('#'+controller.gui.id).length == 0) {
						$(this).show();
						$(this).addClass(controller.classes.executed);
					}
				});
			}
			response.exec = true;
			response.length = els.length;
		} catch (e) {
			controller.error(e);
		}
		return response;
	},
	
	error: function(e) {
		console.log("jTools error: "+e);
	},
	
	process_path: function($e) {
		var cont = $e.getPathObject();
		controller.current_tree = cont;
		controller.gui.clear();
		var len = cont.r.length;
		for (var i=0; i<len; i++) {
			var obj = cont.r[i];
			var className = 'jtools-id-'+i+' jtools-type-';
			controller.gui.add_button(obj.tag,className+'tag',controller.buttonclick);
			if (obj.id != undefined) {
				controller.gui.add_button('#'+obj.id,className+'id',controller.buttonclick);
			}
			if (obj.classes.length) {
				for (var j=0; j<obj.classes.length; j++) {
					controller.gui.add_button('.'+obj.classes[j],className+'class jtools-class-'+j,controller.buttonclick);
				}
			}
			if (i < len -1)  {
				controller.gui.add_space();
			}
		}
	},
	
	buttonclick: function(e) {
		var cls = $(this).attr('class');
		var cls_r = cls.split(' ');
		var idx, type, cls_idx;
		for (var i=0; i<cls_r.length; i++) {
			var cname = cls_r[i];
			var cname_r = cname.split('-');
			if (cname_r && cname_r.length) {
				switch (cname_r[1])
				{
					case 'id':
						idx = cname_r[2];
						break;
					case 'type':
						type = cname_r[2];
						break;
					case 'class':
						cls_idx = cname_r[2];
						break;
				}
			}
		}
		
		var disabled = false;
		if ($(this).hasClass('disabled')) {
			$(this).removeClass('disabled');
		} else {
			$(this).addClass('disabled');
			disabled = true;
		}
		
		var obj = controller.current_tree.r[idx];
		switch (type)
		{
			case 'tag':
				if (obj.tagEnabled) {
					obj.tagEnabled = false;
				} else {
					obj.tagEnabled = true;
				}
				if (disabled) {
					$('.jtools-id-'+idx).addClass('disabled');
				}
				break;
			
			case 'id':
				if (obj.idEnabled) {
					obj.idEnabled = false;
				} else {
					obj.idEnabled = true;
				}
				break;
			case 'class':
				obj.toggleClass(cls_idx);
				break;
			default:
				controller.error("Unknown pathObject type: "+type);
		}
		var str = controller.current_tree.string();
		controller.exec(str);
	}
}