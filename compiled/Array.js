"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Extend = require("./Extend.js");

var _Extend2 = _interopRequireDefault(_Extend);

var _Alias = require("./Alias.js");

var _Alias2 = _interopRequireDefault(_Alias);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function toNumber(value) {
	var num = Number(value);
	return !isNaN(num) && num || 0;
}

function singleItemOrArray(array) {
	return array.length === 1 ? array[0] : array;
}

(0, _Extend2.default)(Array, function average() {
	return this.reduce(function (total, current) {
		return total += toNumber(current);
	}) / this.length;
});

(0, _Extend2.default)(Array, function pluck(value) {
	var returnValue = [];
	this.forEach(function (element) {
		//maybe switch statement? idk
		if (["string", "number"].includes(typeof value === "undefined" ? "undefined" : _typeof(value))) {
			if (element === value) returnValue.push(element);
		} else if (typeof value === "function") {
			if (value(element)) returnValue.push(element);
		} else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
			//mongo-like querying
		}
	});
	return returnValue;
});

(0, _Extend2.default)(Array, function reject(value) {
	var pluckedValues = this.pluck(value);
	return this.filter(function (element) {
		return !pluckedValues.includes(element);
	});
});

(0, _Extend2.default)(Array, function max() {
	return this.reduce(function (max, current) {
		return Math.max(max, toNumber(current));
	}, toNumber(this[0]));
});

(0, _Extend2.default)(Array, function min() {
	return this.reduce(function (min, current) {
		return Math.min(min, toNumber(current));
	}, toNumber(this[0]));
});

(0, _Extend2.default)(Array, function first() {
	var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	return singleItemOrArray(this.slice(0, count));
});

(0, _Extend2.default)(Array, function last() {
	var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	return singleItemOrArray(this.slice(-count));
});

(0, _Extend2.default)(Array, function clone() {
	return this.slice();
});

(0, _Extend2.default)(Array, function remove(from) {
	var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : from + 1;

	this.splice(from, to);
	return this;
});

(0, _Extend2.default)(Array, function clear() {
	this.length = 0;
	return this;
});

(0, _Extend2.default)(Array, function grab(start) {
	var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start + 1;

	return singleItemOrArray(this.splice(start, end - start));
});

(0, _Extend2.default)(Array, function deduplicate() {
	return [].concat(_toConsumableArray(new Set(this)));
});

(0, _Extend2.default)(Array, function mapAsync(callback) {
	return Promise.all(this.map(callback));
});

(0, _Extend2.default)(Array, function filterAsync(predicate) {
	var toFilter = Symbol();
	return this.mapAsync(async function (item) {
		return (await predicate(item)) && item || toFilter;
	}).then(function (results) {
		return results.filter(function (item) {
			return item !== toFilter;
		});
	});
});

(0, _Extend2.default)(Array, function chunkify() {
	var chunkSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	var returnArray = [];
	for (var i = 0; i < this.length; i += chunkSize) {
		returnArray.push(this.slice(i, i + chunkSize));
	}
	return returnArray;
});

(0, _Extend2.default)(Array, function split(separator) {
	var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;

	//Implement limit somehow?
	var chunks = [];
	var splitHere = Symbol("Split here");
	var raw = [splitHere].concat(_toConsumableArray(this.map(function (item) {
		return typeof separator === "function" && separator(item) || separator === item ? splitHere : item;
	})));

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = raw[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var item = _step.value;

			if (item === splitHere) {
				chunks.push([]);
			} else {
				chunks.last().push(item);
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return chunks;
});

(0, _Extend2.default)(Array, function merge() {
	for (var _len = arguments.length, others = Array(_len), _key = 0; _key < _len; _key++) {
		others[_key] = arguments[_key];
	}

	this.push.apply(this, _toConsumableArray(others.flat()));
	return this;
});

(0, _Extend2.default)(Array, function reversed() {
	return this.clone().reverse();
});

(0, _Alias2.default)(Array, "deduplicate", "unique", false);
(0, _Alias2.default)(Array, "average", "avg", false);
(0, _Alias2.default)(Array, "reject", "without", false);
(0, _Alias2.default)(Array, "clone", "copy", false);
(0, _Alias2.default)(Array, "deduplicate", "dedup", false);