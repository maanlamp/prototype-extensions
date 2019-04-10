export function capitalise () {
	return this[0].toUpperCase() + this.substring(1);
}

export function decapitalise () {
	return this[0].toLowerCase() + this.substring(1);
}

export function camelcasify () {
	const words = this
		.replace(/[-_]/g, " ")
		.words();

	return words[0]
		.decapitalise()
		+ words
			.slice(1)
			.map((element) => element.capitalise())
			.join("");
}

export function first (length = 1) {
	return this.substring(0, length);
}

export function last (length = 1) {
	return this.substring(0, this.length - length);
}

export function pad (length = 1, padString = " ") {
	switch (typeof length) {
		case "number": {			
			return this
				.padStart(length, padString)
				.padEnd(length, padString.reverse());
		}
		case "string": {
			padString = length;
			return padString + this + padString.reverse();
		}
		default: throw new Error(`Cannot pad with ${length}`);
	}
}

export function reverse () {
	return [...this]
		.reverse()
		.join("");
}

export function letters () {
	return this.match(/\w/g);
}

export function punctuationMarks () {
	return this.match(/[-[\]{}()*+?.,^$|#!'"]/g);
}

export function escape () {
	return this.replace(/\W/g, "\\$&");
}

export function characters (ignoreWhitespace = true) {
	return (ignoreWhitespace)
		? this.match(/\S/g)
		: [...this];
}

export function truncate (length, symbol = "...") {
	return `${this.substring(0, length)}${symbol}`;
}

export function words (includeSpecialCharacters = true) {
	return (includeSpecialCharacters)
	? this.match(/\b[-'\w]+\b/g)
	: this.match(/\b\w+\b/g);
}

export function wordCount () {
	return this
		.words()
		.length;
}

export function hyphenate () {
	return this
		.words(false)
		.join("-");
}

export function inflect (count) { //Declension? Get grammatical number? idk what the best naming is.
	return (count !== 1)
		? `${this}s`
		: this;
}

export function dedent () {
	const indentation = this
		.substring(this.indexOf("\n") + 1)
		.substring(0, this.search(/\S/) - 1);

	return this
		.replace(new RegExp(`^${indentation}`, "gm"), "")
		.replace(/[\r\t\f\v ]*|<-/g, "");
}

//Aliases
export const capitalize   = capitalise;//.bind(String.prototype);
export const decapitalize = decapitalise;//.bind(String.prototype);
export const camelCasify  = camelcasify;//.bind(String.prototype);
export const toUpper      = String.prototype.toUpperCase;//.bind(String.prototype);
export const upper        = String.prototype.toUpperCase;//.bind(String.prototype);
export const toLower      = String.prototype.toLowerCase;//.bind(String.prototype);
export const lower        = String.prototype.toLowerCase;//.bind(String.prototype);

//titlecasify -> Title Case is Geweldig!