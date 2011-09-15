/**
 * jTools for Google Chrome.
 *
 * This extension allows you to break a page down using jQuery selectors, by seeing
 * which elements match a given selector or by clicking an element and seeing the
 * jQuery selector that defines it.
 *
 * Load the extension into Chrome, and you will see a small jQuery logo at the
 * bottom right hand of each page - click to open the main GUI. Also, there's a
 * jQuery logo in the top right of the Chrome toolbar. Click this to get a search
 * box, where you can enter a jQuery selector. The results are then highlighted
 * on the current page.
 *
 * This software is released under the GNU license. You can do what you like! Please
 * code socially, and collaborate on Github.
 *
 * @author Jonathan Cairns <jon@joncairns.com>
 * @version 0.1
 *
 *
 * TODO (version 0.1)
 * ==================
 * - Comment!
 * - Copy to clipboard is currently just a placeholder button. Make it work.
 * - Improve the GUI.
 * - When in mouse-hover mode, sometimes the hover event doesn't always fire. This
 *    seems to be related to the event.target object?
 * 
 */

/**
 * Check whether an element exists in an array
 *
 * @param {Array} arr The array to check
 * @param {String|Number} item The element to search for
 * @return {Boolean}
 */
function in_array(arr,item) {
	var ret = false;
	for (var i=0; i<arr.length; i++) {
		if (arr[i] == item) {
			ret = true;
			break;
		}
	}
	return ret;
}

//Set up the GUI and listeners
controller.init();