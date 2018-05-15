"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Extend = require("./Extend.js");

var _Extend2 = _interopRequireDefault(_Extend);

var _Alias = require("./Alias.js");

var _Alias2 = _interopRequireDefault(_Alias);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//Actual methods
(0, _Extend2.default)(String, function capitalise() {
	return this[0].toUpperCase() + this.slice(1);
});

(0, _Extend2.default)(String, function decapitalise() {
	return this[0].toLowerCase() + this.slice(1);
});

(0, _Extend2.default)(String, function camelcasify() {
	var temp = this.replace(/[-_]/g, " ").words();
	return temp[0].decapitalise() + temp.slice(1).map(function (element) {
		return element.capitalise();
	}).join("");
});

(0, _Extend2.default)(String, function first() {
	return this.slice(0, length);
});

(0, _Extend2.default)(String, function last() {
	return this.slice(-length);
});

(0, _Extend2.default)(String, function pad() {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	var padString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";

	switch (typeof length === "undefined" ? "undefined" : _typeof(length)) {
		case "number":
			return this.padLeft(length, padString).padRight(length, padString.reverse());
			break;
		case "string":
			padString = length;
			return padString + this + padString.reverse();
			break;
		default:
			throw new Error("Cannot pad with " + length);
	}
});

(0, _Extend2.default)(String, function padLeft() {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	var padString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";

	switch (typeof length === "undefined" ? "undefined" : _typeof(length)) {
		case "number":
			return padString.repeat(length) + this;
			break;
		case "string":
			padString = length;
			return padString + this;
			break;
		default:
			throw new Error("Cannot pad with " + length);
	}
});

(0, _Extend2.default)(String, function padRight() {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	var padString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";

	switch (typeof length === "undefined" ? "undefined" : _typeof(length)) {
		case "number":
			return this + padString.repeat(length);
			break;
		case "string":
			padString = length;
			return this + padString;
			break;
		default:
			throw new Error("Cannot pad with " + length);
	}
});

(0, _Extend2.default)(String, function reverse() {
	return this.letters().reverse().join("");
});

(0, _Extend2.default)(String, function letters() {
	return this.match(/\w/g);
});

(0, _Extend2.default)(String, function punctuationMarks() {
	return this.match(/[-[\]{}()*+?.,^$|#!'"]/g);
});

(0, _Extend2.default)(String, function escape() {
	return this.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
});

(0, _Extend2.default)(String, function characters() {
	var ignoreWhitespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	return ignoreWhitespace ? this.match(/\S/g) : [].concat(_toConsumableArray(this));
});

(0, _Extend2.default)(String, function truncate(length) {
	var string = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "...";

	return "" + this.slice(0, length) + string;
});

(0, _Extend2.default)(String, function words() {
	var includeSpecialCharacters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	return includeSpecialCharacters ? this.match(/\b[-'\w]+\b/g) : this.match(/\b\w+\b/g);
});

(0, _Extend2.default)(String, function wordCount() {
	return this.words().length;
});

(0, _Extend2.default)(String, function hyphenate() {
	return this.words(false).join("-");
});

console.groupCollapsed("Aliasing...");
(0, _Alias2.default)(String, "capitalise", "capitalize");
(0, _Alias2.default)(String, "decapitalise", "decapitalize");
(0, _Alias2.default)(String, "camelcasify", "camelCasify");
(0, _Alias2.default)(String, "toLowerCase", "toLower");
(0, _Alias2.default)(String, "toLowerCase", "lower");
(0, _Alias2.default)(String, "toUpperCase", "toUpper");
(0, _Alias2.default)(String, "toUpperCase", "upper");
console.groupEnd();

//titlecasify -> Title Case is Geweldig!