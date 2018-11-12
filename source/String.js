import extendPrototype from "./Extend.js";

//Actual methods
extendPrototype(String, function capitalise () {
	return this[0].toUpperCase() + this.slice(1);
});

extendPrototype(String, function decapitalise () {
	return this[0].toLowerCase() + this.slice(1);
});

extendPrototype(String, function camelcasify () {
	const temp = this.replace(/[-_]/g, " ").words();
	return temp[0].decapitalise() + temp.slice(1).map((element) => element.capitalise()).join("");
});

extendPrototype(String, function first (length = 1) {
	return this.slice(0, length);
});

extendPrototype(String, function last (length = 1) {
	return this.slice(-length);
});

extendPrototype(String, function pad (length = 1, padString = " ") {
	switch (typeof length) {
		case "number":
			return this.padStart(length, padString).padEnd(length, padString.reverse());
		case "string":
			padString = length;
			return padString + this + padString.reverse();
		default: throw new Error(`Cannot pad with ${length}`);
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

extendPrototype(String, function reverse () {
	return [...this].reverse().join("");
});

extendPrototype(String, function letters () {
	return this.match(/\w/g);
});

extendPrototype(String, function punctuationMarks () {
	return this.match(/[-[\]{}()*+?.,^$|#!'"]/g);
});

extendPrototype(String, function escape () {
	return this.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
});

extendPrototype(String, function characters (ignoreWhitespace = true) {
	return (ignoreWhitespace) ? this.match(/\S/g) : [...this];
});

extendPrototype(String, function truncate (length, string = "...") {
	return `${this.slice(0, length)}${string}`;
});

extendPrototype(String, function words (includeSpecialCharacters = true) {
	return (includeSpecialCharacters) ? this.match(/\b[-'\w]+\b/g) : this.match(/\b\w+\b/g);
});

extendPrototype(String, function wordCount () {
	return this.words().length;
});

extendPrototype(String, function hyphenate () {
	return this.words(false).join("-");
});

extendPrototype(String, function inflect (count) { //Declension? Get grammatical number? idk what the best naming is.
	return (count !== 1) ? `${this}s` : this;
});

import alias from "./Alias.js";
console.groupCollapsed("Aliasing String methods...");
alias(String, "capitalise",   "capitalize",   false);
alias(String, "decapitalise", "decapitalize", false);
alias(String, "camelcasify",  "camelCasify",  false);
alias(String, "toLowerCase",  "toLower",      false);
alias(String, "toLowerCase",  "lower",        false);
alias(String, "toUpperCase",  "toUpper",      false);
alias(String, "toUpperCase",  "upper",        false);
alias(String, "first",        "firstChar",    false);
alias(String, "last",         "lastChar",     false);
console.groupEnd();

//titlecasify -> Title Case is Geweldig!