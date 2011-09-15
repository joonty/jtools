function jtools_interface() {
	this.id = 'jtools-interface';
	this.path_id = 'jtools-path';
	this.opened = false;
	
	$('body').append('<div id="'+this.id+'" class="off"><div id="'+this.path_id+'"></div>\
					 <div id="jtools-cpanel">\
					 <div id="jtools-copy" class="jtools-button"><img src="#" title="Copy current selector to clipboard" /></div>\
					 <div id="jtools-logo" class="jtools-button"><img src="#" title="Enable jTools" /></div>\
					 </div>');
	this.el = $('#'+this.id);
	this.logo = $('#jtools-logo');
	this.logo.find('img').attr('src',chrome.extension.getURL("images/jquery.png"));
	this.copy = $('#jtools-copy');
	this.copy.find('img').attr('src',chrome.extension.getURL("images/attach.png"));
	this.d_el = $('#'+this.path_id);
}

jtools_interface.prototype = {	
 	open: function() {
		this.el.removeClass('off').addClass('on');
		this.opened = true;
	},
	
	close: function() {
		this.opened = false;
		this.d_el.empty();
		this.el.removeClass('on').addClass('off');
	},
	
	display: function(t) {
		this.d_el.html(t);
	},
	
	clear: function() {
		this.d_el.empty();
	},
	
	show_path: function(path) {
		path = path.replace(/^\s*/,'').replace(/\s/g,'&nbsp;&bull;&nbsp;');
		this.display(path);
	},
	
	add_button: function(text,className,onClick) {
		var btn = $('<div class="jtools-button '+className+'">'+text+'</div>');
		btn.click(onClick);
		btn.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		this.d_el.append(btn);
		
	},
	add_space: function() {
		this.d_el.append('<div class="jtools-space">&bull;</div>')
	}
}