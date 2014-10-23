(function() {
	$.fn.svglite = function (opts) {
		if (this.prop('tagName') != 'svg') {
			console.log("Not a valid SVGLite element");
		}
		else if (!this.attr('id')) {
			this.attr('id') = 'svg'+Math.floor(date.getTime() * Math.random(0x10000));
		}
		else {
			if (!this.attr('svglite')) {
				if (!window.svglite) {
					window.svglite = {};
					window.svglite.obj = [];
				}
				date = new Date;
				var hash = Math.floor(date.getTime() * Math.random(0x10000));
				this.attr('svglite',hash);
				var settings = $.extend({
					resize: false,
					special: '',
					speed: 1500,
					default_opacity: 1,
					change_opacity: 1,
				},opts);
				$('<style>svg#'+$(this).attr('id')+' path { transition: fill '+settings.speed/1000+'s ease,fill-opacity '+settings.speed/1000+'s; -webkit-backface-visiblity: hidden; -webkit-transition: fill '+settings.speed/1000+'s ease,fill-opacity '+settings.speed/1000+'s;  }</style>').appendTo('html');
				var obj = {};
				obj.hash = hash;
				obj.defaults = Array(parseInt(this.attr('height')),parseInt(this.attr('width')));
				obj.resize = settings.resize;
				obj.size = settings.special;
				obj.patterns = settings.patterns;
				obj.defopacity = settings.default_opacity;
				obj.chopacity = settings.change_opacity;
				window.svglite[hash] = obj;
				window.svglite.obj.push(hash);
				if (settings.resize) {
					$(window).resize(function() {
						svgresize(hash);
					});
				}
				svgresize(hash,settings.special);
				return this;
			}

			var hash = this.attr('svglite');
			var settings = window.svglite[hash];
			if (opts.resize != settings.resize) {
				//Sir Not Needed In This Project
			}
			else if (opts.special != settings.special) {
				//Sir Not Needed In This Project
			}

			function svgresize(id,style) {
				if (window.svglitedefs[style]) {
					svgw = svglitedefs[style]*.9;
					svgh = svglitedefs[style]*.9*(window.svglite[id].defaults[0]/window.svglite[id].defaults[1]);
				}
				else if (svglitedefs.max) {
					svgw = $(window).width()*.9;
					svgw = (svgw > svglitedefs.max) ? svglitedefs.max : svgw;
					svgh = svgw*(window.svglite[id].defaults[0]/window.svglite[id].defaults[1]);
				}
				else {
					svgw = $(window).width()*.9;
					svgh = svgw*(window.svglite[id].defaults[0]/window.svglite[id].defaults[1]);
				}
				if (window.svglitedefs.overflow == false) {
					var th = $(window).height();
					if (svgh > th) {
						svgh = th * 0.9;
						svgw = svgh*(window.svglite[id].defaults[1]/window.svglite[id].defaults[0]);
					}
				}
				svg = $('svg[svglite='+hash+']');
				svg.attr('viewbox','0,0,'+svgw+','+svgh+',true');
				svg.attr('size','100%,100%');
				$(svg).parent().attr({'width':svgw,'height':svgh});
				$(svg).attr({'width':svgw,'height':svgh});
			}
		}
	}

	$.fn.pathclass_pattern = function(colorclass,type) {
		var patterns = window.svglite[this.parents('svg').attr('svglite')].patterns;
		var def_op = window.svglite[this.parents('svg').attr('svglite')].defopacity;
		var ch_op = window.svglite[this.parents('svg').attr('svglite')].chopacity;
		if (!colorclass) {
			this.css({'fill-opacity':def_op});
			var randhash = Math.floor(Math.random() * 0x10000000);
			window.svglite[randhash] = this;
			setTimeout(function() {
				window.svglite_unset_patterns(randhash);
			},patterns/3);
			return this;
		}
		if (this.attr('class') == colorclass) {
			return this;
		}
		else if (type == 'add') {
			// If there's not one defined, skip to regular add class at bottom. Otherwise returns 'undefined' class
			if (this.attr('class')) {
				this.attr({'class':this.attr('class')+' '+colorclass}).this.css('fill-opacity',ch_op);	
				return this;
			}
		}
		// Remove a specific class
		else if (type == 'remove') {
			if (this.attr('class') == colorclass) {
				this.removeAttr('class').css('fill-opacity',def_op);;
				return this;
			}
			else if (this.attr('class')) {
				this.css('fill-opacity',def_op).attr({'class':this.attr('class').replace(colorclass,'')}).css('fill-opacity',ch_op);	
			}
		}
		// Default replaces all exsting classes with specified
		if (this.attr('class')) {
			this.css({'fill-opacity':def_op});
			var randhash = Math.floor(Math.random() * 0x10000000);
			window.svglite[randhash] = this;
			setTimeout(function() {
				window.svglite_set_patterns(randhash,colorclass);
			},patterns/3);
		}
		else {
			this.attr({'class':colorclass}).css('fill-opacity',ch_op);
		}
		return this;
	}

	$.fn.pathclass = function (colorclass,type) {
		// If nothing, clear all styles
		if (!colorclass) {
			this.removeAttr('class');
			return this;
		}
		// If adding a class
		else if (type == 'add') {
			if (this.attr('class') == colorclass) {
				return this;
			}
			// If there's not one defined, skip to regular add class at bottom. Otherwise returns 'undefined' class
			if (this.attr('class')) {
				if ($.inArray(this.attr('class').split(' '),colorclass) == -1) {
					this.attr({'class':this.attr('class')+' '+colorclass});	
				}
				return this;
			}
		}
		// Remove a specific class
		else if (type == 'remove') {
			if (this.attr('class') == colorclass) {
				this.removeAttr('class');
				return this;
			}
			else if (this.attr('class')) {
				var re = new RegExp('(\s?)'+colorclass+'(\s?)','g');
				this.attr('class',this.attr('class').replace(re,''));
				return this;
			}
		}
		// Default replaces all exsting classes with specified
		this.attr({'class':colorclass});
		return this;
	}
	window.svglitedefs = {};
	window.svglitedefs.resize = [];
	window.svglitedefs.overflow = false;
	
	window.svglite_unset_patterns = function(obj) {
		$(window.svglite[obj]).removeAttr('class');
		window.svglite[obj] = false;
	}
	window.svglite_set_patterns = function(obj,color) {
		$(window.svglite[obj]).removeAttr('class').attr('class',color).css({'fill-opacity':1});
		window.svglite[obj] = false;
	}
})(jQuery);