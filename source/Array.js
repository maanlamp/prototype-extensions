import extendPrototype from "./Extend.js";

function toNumber(value) {
	const num = Number(value);
	return (!isNaN(num) && num) || 0;
}

extendPrototype(Array, function average () {
	return this.reduce((total, current) => total += toNumber(current)) / this.length;
});

extendPrototype(Array, function pluck (value) {
	const returnValue = [];
	this.forEach(element => {
		//maybe switch statement? idk
		if (["string", "number"].includes(typeof value)) {
			if (element === value) returnValue.push(element);
		} else if (typeof value === "function") {
			if (value(element)) returnValue.push(element);
		} else if (typeof value === "object") {
			//mongo-like querying
		}
	});
	return returnValue;
});

extendPrototype(Array, function reject (value) {
	const pluckedValues = this.pluck(value);
	return this.filter(element => !pluckedValues.includes(element));
});

extendPrototype(Array, function max () {
	return this.reduce((max, current) => Math.max(max, toNumber(current)), toNumber(this[0]));
});

extendPrototype(Array, function min () {
	return this.reduce((min, current) => Math.min(min, toNumber(current)), toNumber(this[0]));
});

extendPrototype(Array, function first ( count = 1) {
	return this.slice(0, count);
});

extendPrototype(Array, function last (count = 1) {
	return this[this.length - count];
});

extendPrototype(Array, function clone () {
	return this.slice();
});

extendPrototype(Array, function remove (from, to = from + 1) {
	this.splice(from, to);
	return this;
});

extendPrototype(Array, function clear () {
	this.length = 0;
	return this;
});

extendPrototype(Array, function grab (start, end = start + 1) {
	const grabbed = this.splice(start, end - start);
	return (grabbed.length === 1) ? grabbed[0] : grabbed;
});

extendPrototype(Array, function chunkify (chunkSize = 1) {
	const returnArray = [];
	for (let i = 0; i < this.length; i += chunkSize) {
		returnArray.push(this.slice(i, i + chunkSize));
	}
	return returnArray;
});

import alias from "./Alias.js";
console.groupCollapsed("Aliasing Array methods...");
alias(Array, "average", "avg",     false);
alias(Array, "reject",  "without", false);
alias(Array, "clone",   "copy",    false);
console.groupEnd();