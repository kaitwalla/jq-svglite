!function(){$.fn.svglite=function(t){function s(t,s){if(window.svglitedefs[s]?(svgw=.9*svglitedefs[s],svgh=.9*svglitedefs[s]*(window.svglite[t].defaults[0]/window.svglite[t].defaults[1])):svglitedefs.max?(svgw=.9*$(window).width(),svgw=svgw>svglitedefs.max?svglitedefs.max:svgw,svgh=svgw*(window.svglite[t].defaults[0]/window.svglite[t].defaults[1])):(svgw=.9*$(window).width(),svgh=svgw*(window.svglite[t].defaults[0]/window.svglite[t].defaults[1])),0==window.svglitedefs.overflow){var e=$(window).height();svgh>e&&(svgh=.9*e,svgw=svgh*(window.svglite[t].defaults[1]/window.svglite[t].defaults[0]))}svg=$("svg[svglite="+i+"]"),svg.attr("viewbox","0,0,"+svgw+","+svgh+",true"),svg.attr("size","100%,100%"),$(svg).parent().attr({width:svgw,height:svgh}),$(svg).attr({width:svgw,height:svgh})}if("svg"!=this.prop("tagName"))console.log("Not a valid SVGLite element");else if(this.attr("id")){if(!this.attr("svglite")){window.svglite||(window.svglite={},window.svglite.obj=[]),$("<style>svg#"+$(this).attr("id")+" path { transition: fill 1.5s ease,fill-opacity 1.5s,stroke-width 0.5s; -webkit-backface-visiblity: hidden; -webkit-transition: fill 1.5s ease,fill-opacity 1.5s,stroke-width 0.5s;  }</style>").appendTo("html"),date=new Date;var i=Math.floor(date.getTime()*Math.random(65536));this.attr("svglite",i);var e=$.extend({resize:!1,special:"",patterns:!1,default_opacity:1,change_opacity:1},t),a={};return a.hash=i,a.defaults=Array(parseInt(this.attr("height")),parseInt(this.attr("width"))),a.resize=e.resize,a.size=e.special,a.patterns=e.patterns,a.defopacity=e.default_opacity,a.chopacity=e.change_opacity,window.svglite[i]=a,window.svglite.obj.push(i),e.resize&&$(window).resize(function(){s(i)}),s(i,e.special),this}var i=this.attr("svglite"),e=window.svglite[i];t.resize!=e.resize||t.special!=e.special}else this.attr("id")="svg"+Math.floor(date.getTime()*Math.random(65536))},$.fn.pathclass_pattern=function(t,s){var i=window.svglite[this.parents("svg").attr("svglite")].patterns,e=window.svglite[this.parents("svg").attr("svglite")].defopacity,a=window.svglite[this.parents("svg").attr("svglite")].chopacity;if(!t){this.css({"fill-opacity":e});var l=Math.floor(268435456*Math.random());return window.svglite[l]=this,setTimeout(function(){window.svglite_unset_patterns(l)},i/3),this}if(this.attr("class")==t)return this;if("add"==s){if(this.attr("class"))return this.attr({"class":this.attr("class")+" "+t}).this.css("fill-opacity",a),this}else if("remove"==s){if(this.attr("class")==t)return this.removeAttr("class").css("fill-opacity",e),this;this.attr("class")&&this.css("fill-opacity",e).attr({"class":this.attr("class").replace(t,"")}).css("fill-opacity",a)}if(this.attr("class")){this.css({"fill-opacity":e});var l=Math.floor(268435456*Math.random());window.svglite[l]=this,setTimeout(function(){window.svglite_set_patterns(l,t)},i/3)}else this.attr({"class":t}).css("fill-opacity",a);return this},$.fn.pathclass=function(t,s){if(!t)return this.removeAttr("class"),this;if("add"==s){if(this.attr("class")==t)return this;if(this.attr("class"))return-1==$.inArray(this.attr("class").split(" "),t)&&this.attr({"class":this.attr("class")+" "+t}),this}else if("remove"==s){if(this.attr("class")==t)return this.removeAttr("class"),this;if(this.attr("class")){var i=new RegExp("(s?)"+t+"(s?)","g");return this.attr("class",this.attr("class").replace(i,"")),this}}return this.attr({"class":t}),this},window.svglitedefs={},window.svglitedefs.resize=[],window.svglitedefs.overflow=!1,window.svglite_unset_patterns=function(t){$(window.svglite[t]).removeAttr("class"),window.svglite[t]=!1},window.svglite_set_patterns=function(t,s){$(window.svglite[t]).removeAttr("class").attr("class",s).css({"fill-opacity":1}),window.svglite[t]=!1}}(jQuery);