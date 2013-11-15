function any() {
	return true;
}

function equalTo(a, b) {
	/*jshint eqeqeq:false */
	// Yes, I know what I'm doing.
	return a == b;
}

function notEqualTo(a, b) {
	/*jshint eqeqeq:false */
	// Yes, I'm doing this on purpose.
	return a != b;
}

function lessThan(a, b) {
	return a < b;
}

function greaterThan(a, b) {
	return a > b;
}

function lessThanOrEqualTo(a, b) {
	return a <= b;
}

function greaterThanOrEqualTo(a, b) {
	return a >= b;
}

exports.buildFilters = function (filterObject) {
	var f = [];

	for (var k in filterObject) {
		if (filterObject.hasOwnProperty(k)) {
			var prop = k;
			var comp = equalTo;
			var val = filterObject[k];

			if (k === 'any') {
				prop = '';
				comp = any;
				val = true;
			}

			if (typeof val === 'string') {
				if (val.indexOf('>=') === 0) {
					comp = greaterThanOrEqualTo;
					val = val.substring(2);
				} else if (val.indexOf('<=') === 0) {
					comp = lessThanOrEqualTo;
					val = val.substring(2);
				} else if (val.indexOf('>') === 0) {
					comp = greaterThan;
					val = val.substring(1);
				} else if (val.indexOf('<') === 0) {
					comp = lessThan;
					val = val.substring(1);
				} else if (val.indexOf('!=') === 0) {
					comp = notEqualTo;
					val = val.substring(2);
				}
			}

			f.push({ prop: prop, comp: comp, val: val });
		}
	}

	return f;
};