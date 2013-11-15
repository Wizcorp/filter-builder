var assert = require('assert');

var buildFilters = require('..').buildFilters;

var testFilter = {
	bananas: '>=10',
	apples: '<3',
	name: '!=larry'
}

var fruitSellerList = [
	{ name: 'larry', apples: 2, bananas: 12 },
	{ name: 'rick', apples: 4, bananas: 10 },
	{ name: 'carl', apples: 1, bananas: 13 },
	{ name: 'mark', apples: 4, bananas: 9 },
];

describe('filter-builder', function () {
	it('filters our test data to match our expected result.', function () {
		var filters = buildFilters(testFilter);

		var filtered = fruitSellerList.filter(function (entry) {
			var result = true;

			for (var i = 0; i < filters.length && result; i += 1) {
				var test = filters[i];
				result = result && test.comp(entry[test.prop], test.val);
			}
			
			return result;
		});

		assert.equal(1, filtered.length);
	});
});