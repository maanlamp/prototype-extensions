"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.capitalise = capitalise;
exports.decapitalise = decapitalise;
exports.camelcasify = camelcasify;
exports.first = first;
exports.last = last;
exports.pad = pad;
exports.reverse = reverse;
exports.letters = letters;
exports.punctuationMarks = punctuationMarks;
exports.escape = escape;
exports.characters = characters;
exports.truncate = truncate;
exports.words = words;
exports.wordCount = wordCount;
exports.hyphenate = hyphenate;
exports.inflect = inflect;
exports.dedent = dedent;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function capitalise() {
	return this[0].toUpperCase() + this.substring(1);
}

function decapitalise() {
	return this[0].toLowerCase() + this.substring(1);
}

function camelcasify() {
	var words = this.replace(/[-_]/g, " ").words();

	return words[0].decapitalise() + words.slice(1).map(function (element) {
		return element.capitalise();
	}).join("");
}

function first() {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	return this.substring(0, length);
}

function last() {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	return this.substring(0, this.length - length);
}

function pad() {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	var padString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";

	switch (typeof length === "undefined" ? "undefined" : _typeof(length)) {
		case "number":
			{
				return this.padStart(length, padString).padEnd(length, padString.reverse());
			}
		case "string":
			{
				padString = length;
				return padString + this + padString.reverse();
			}
		default:
			throw new Error("Cannot pad with " + length);
	}
}

function reverse() {
	return [].concat(_toConsumableArray(this)).reverse().join("");
}

function letters() {
	return this.match(/\w/g);
}

function punctuationMarks() {
	return this.match(/[-[\]{}()*+?.,^$|#!'"]/g);
}

function escape() {
	return this.replace(/\W/g, "\\$&");
}

function characters() {
	var ignoreWhitespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	return ignoreWhitespace ? this.match(/\S/g) : [].concat(_toConsumableArray(this));
}

function truncate(length) {
	var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "...";

	return "" + this.substring(0, length) + symbol;
}

function words() {
	var includeSpecialCharacters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	return includeSpecialCharacters ? this.match(/\b[-'\w]+\b/g) : this.match(/\b\w+\b/g);
}

function wordCount() {
	return this.words().length;
}

function hyphenate() {
	return this.words(false).join("-");
}

function inflect(count) {
	//Declension? Get grammatical number? idk what the best naming is.
	return count !== 1 ? this + "s" : this;
}

function dedent() {
	var indentation = this.substring(this.indexOf("\n") + 1).substring(0, this.search(/\S/) - 1);

	return this.replace(new RegExp("^" + indentation, "gm"), "").replace(/[\r\t\f\v ]*|<-/g, "");
}

//Aliases
var capitalize = exports.capitalize = capitalise; //.bind(String.prototype);
var decapitalize = exports.decapitalize = decapitalise; //.bind(String.prototype);
var camelCasify = exports.camelCasify = camelcasify; //.bind(String.prototype);
var toUpper = exports.toUpper = String.prototype.toUpperCase; //.bind(String.prototype);
var upper = exports.upper = String.prototype.toUpperCase; //.bind(String.prototype);
var toLower = exports.toLower = String.prototype.toLowerCase; //.bind(String.prototype);
var lower = exports.lower = String.prototype.toLowerCase; //.bind(String.prototype);

//titlecasify -> Title Case is Geweldig!