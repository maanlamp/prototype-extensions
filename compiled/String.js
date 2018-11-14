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
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	return this.slice(0, length);
});

(0, _Extend2.default)(String, function last() {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	return this.slice(-length);
});

(0, _Extend2.default)(String, function pad() {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	var padString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";

	switch (typeof length === "undefined" ? "undefined" : _typeof(length)) {
		case "number":
			return this.padStart(length, padString).padEnd(length, padString.reverse());
		case "string":
			padString = length;
			return padString + this + padString.reverse();
		default:
			throw new Error("Cannot pad with " + length);
	}
});

// DEPRECATED
// extendPrototype(String, function padLeft (length = 1, padString = " ") {
// 	switch (typeof length) {
// 		case "number":
// 			return padString.repeat(length) + this;
// 		case "string":
// 			padString = length;
// 			return padString + this;
// 		default: throw new Error(`Cannot pad with ${length}`);
// 	}
// });

// extendPrototype(String, function padRight (length = 1, padString = " ") {
// 	switch (typeof length) {
// 		case "number":
// 			return this + padString.repeat(length);
// 		case "string":
// 			padString = length;
// 			return this + padString;
// 		default: throw new Error(`Cannot pad with ${length}`);
// 	}
// });

(0, _Extend2.default)(String, function reverse() {
	return [].concat(_toConsumableArray(this)).reverse().join("");
});

(0, _Extend2.default)(String, function letters() {
	return this.match(/\w/g);
});

(0, _Extend2.default)(String, function punctuationMarks() {
	return this.match(/[-[\]{}()*+?.,^$|#!'"]/g);
});

(0, _Extend2.default)(String, function escape() {
	return this.replace(/\W/g, "\\$&");
});

(0, _Extend2.default)(String, function characters() {
	var ignoreWhitespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	return ignoreWhitespace ? this.match(/\S/g) : [].concat(_toConsumableArray(this));
});

(0, _Extend2.default)(String, function truncate(length) {
	var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "...";

	return "" + this.slice(0, length) + symbol;
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

(0, _Extend2.default)(String, function inflect(count) {
	//Declension? Get grammatical number? idk what the best naming is.
	return count !== 1 ? this + "s" : this;
});

(0, _Extend2.default)(String, function startsWith(pattern) {
	return this.first(pattern.length) === pattern;
});

console.groupCollapsed("Aliasing String methods...");
(0, _Alias2.default)(String, "capitalise", "capitalize", false);
(0, _Alias2.default)(String, "decapitalise", "decapitalize", false);
(0, _Alias2.default)(String, "camelcasify", "camelCasify", false);
(0, _Alias2.default)(String, "toLowerCase", "toLower", false);
(0, _Alias2.default)(String, "toLowerCase", "lower", false);
(0, _Alias2.default)(String, "toUpperCase", "toUpper", false);
(0, _Alias2.default)(String, "toUpperCase", "upper", false);
console.groupEnd();

//titlecasify -> Title Case is Geweldig!