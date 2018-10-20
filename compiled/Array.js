"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Extend = require("./Extend.js");

var _Extend2 = _interopRequireDefault(_Extend);

var _Alias = require("./Alias.js");

var _Alias2 = _interopRequireDefault(_Alias);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toNumber(value) {
	return Number(value) || 0;
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
		};
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
	});
});

(0, _Extend2.default)(Array, function min() {
	return this.reduce(function (min, current) {
		return Math.min(min, toNumber(current));
	});
});

(0, _Extend2.default)(Array, function first() {
	return this[0];
});

(0, _Extend2.default)(Array, function last() {
	return this[this.length - 1];
});

(0, _Extend2.default)(Array, function clone() {
	return this.slice();
});

(0, _Extend2.default)(Array, function remove(from, to) {
	if (!to) to = from + 1;
	this.splice(from, to);
	return this;
});

(0, _Extend2.default)(Array, function clear() {
	this.length = 0;
	return this;
});

(0, _Extend2.default)(Array, function grab(start) {
	var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start + 1;

	var grabbed = this.splice(start, end - start);
	return grabbed.length === 1 ? grabbed[0] : grabbed;
});

console.groupCollapsed("Aliasing Array methods...");
(0, _Alias2.default)(Array, "average", "avg", false);
(0, _Alias2.default)(Array, "reject", "without", false);
(0, _Alias2.default)(Array, "clone", "copy", false);
console.groupEnd();