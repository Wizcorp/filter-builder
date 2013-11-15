[![Build Status](https://travis-ci.org/bjornstar/filter-builder.png)](https://travis-ci.org/bjornstar/filter-builder)

filters
=======

Build programmable object property filters

Here are your filters:
```javascript
var list = [ ... ]; // lots of simple objects in here.

var filterObject = {
	age: '>=18',
	gender: 'f',
	eyes: 'brown'
}
```

Use them like this:
```javascript
	var buildFilters = require('filter-builder');

	var filters = buildFilters(filterObject);

	var filteredList = list.filter(function (entry) {
		var result = true;

		for (var i = 0; i < filters.length && result; i += 1) {
			var test = filters[i];
			result = result && test.comp(entry[test.prop], test.val);
		}
		
		return result;
	});
```

Supported comparators are:

'>', '<', ''>=', '<=', '!='