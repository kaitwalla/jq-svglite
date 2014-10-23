#SVGLite

Use a combination of jQuery and CSS to do some basic style transformations with inline SVGs. Best use case is situations where you already have an SVG file (say, a map) and want to change the fill or stroke properties on the fly, or dynamically set the size of the element (including responsive).

See more on the plugin [here](http://unjournalist.com/svglite-jquery-plugin-for-manipulating-svg-fills-strokes-and-sizing/)  
See it in action [here](http://zedley.github.io/svglite/)

##Basic usage

To get the party started, you need to include any settings (see below), then select your element with the jQuery selector and invoke the plugin thusly:  
`$('#mySVG').svglite();`  
Please note that this does almost nothing, but if you use the accompanying functions `pathclass` or `pathclass_pattern` you should call svglite first to set the properties.

###Properties

You have four basic properties to call here:  
• `resize`: Whether you want the SVG to automatically resize based on the window size (true or false)  
• `speed`: If you're going to be using pattern fills for this element, you need to set the animation timing for the patterns here, in milliseconds. For more on this, see "Patterns."  
• `default_opacity`: This setting is also used for patterns. The default opacity setting for your paths.  
• `change_opacity'`: This is the path opacity you're changing to. (See "Patterns")  
• `special`: If you have a specific size you want the SVG to be sized to, use this property with the name of the size you want. You'll declare the size in the settings, below.

###Settings

Including the plugin file will automatically create a global variable `svglitedefs` that we're going to use for a few global settings. 

`svglitedefs.resize[str]`: This is the setting the 'special' property refers to. The example is if you have a CMS with a set width. This way we can declare a special setting "wordpress" to never go wider than 600 pixels with `svglitedefs.resize['wordpress'] = 600;`. Then, when you invoke the plugin, use `$('#svg').svglite({special:'wordpress'});`.  
`svglitedefs.max`: Used with the responsive property to set a maximum width. If you want it to resize up to 1000px, set this to `1000`.

##Class changes

###Colors

The other big thing that SVGLite provides is the ability to change the styling of your SVG paths. (Note: This may also work on polyfills, compound paths and groups, but it's only been tested on paths because that's all I needed it to do.)

Most of this is done via CSS, but the provided secondary jQuery functions (pathclass and pathclass_pattern) provide an easy method to implement the necessary CSS changes (`$.addClass` and `$.removeClass` DO NOT WORK on SVGs. Trust me). The script automatically calls in the necessary transitions on all paths that are children of your main SVG element.

Usage is pretty easy. If you're using just color fills (or changing the stroke), use `$.pathclass` thusly:  

`$('#path_id').pathclass('class');`

The default behavior is to replace all classes with the one provided. If you want to add a class while keeping the extant ones, use this:

`$('#path_id').pathclass('class','add');`

If you want to clear all classes, run the function with no parameters.

`$('#path_id').pathclass();`

If you want to remove a specific class, this:

`$('#path_id').pathclass('class','remove');`

###Patterns

Patterns are the SVG implementation of background images. Because these must be defined [within the SVG](http://stackoverflow.com/a/3798797/645364) itself, the CSS fade we're using for colors doesn't work. Hence, if you're working with elements that are EVER going to use a pattern fill, you should use this second set of functions.

Basically, we fake the transitions via the fill-opacity CSS property, which does exactly what you think it does. How the examples do it are pretty simple: everything starts at a mostly transparent color (0.1 black, which renders a light gray). You could also start with something super dark and fade in and out, but for our purposes we go light to dark.

So our example would use

`$('#svg).svglite({change_opacity:1,default_opacity:0.1});`

And for our class changes we would use

`$('#path_id').pathclass_pattern();`

With the same rules that apply above in terms of adding and removing classes.

##Limitations  
I cannot stress enough the basic nature of this plugin. If you want to do anything other than change the fill, stroke or size of your SVG, this plugin **will not do jack for you**. I created it for my own uses for basic maps, and am loading up [ImageMagick-created PNGs](http://stackoverflow.com/questions/4809194/convert-svg-image-to-png-with-php) as fallbacks.