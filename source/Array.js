import extendPrototype from "./Extend.js";

function toNumber(value) {
	const num = Number(value);
	return (!isNaN(num) && num) || 0;
}

function singleItemOrArray (array) {
	return (array.length === 1)
		? array[0]
		: array;
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
	return singleItemOrArray(this.slice(0, count));
});

extendPrototype(Array, function last (count = 1) {
	return singleItemOrArray(this.slice(-count));
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
	return singleItemOrArray(this.splice(start, end - start));
});

extendPrototype(Array, function deduplicate () {
	return [...new Set(this)];
});

extendPrototype(Array, function mapAsync (callback) {
	return Promise.all(this.map(callback));
});

extendPrototype(Array, function filterAsync (predicate) {
	const toFilter = Symbol();
	return this.mapAsync(async item => (await predicate(item) && item) || toFilter).then(results => {
		return results.filter(item => item !== toFilter);
	});
});

extendPrototype(Array, function chunkify (chunkSize = 1) {
	const returnArray = [];
	for (let i = 0; i < this.length; i += chunkSize) {
		returnArray.push(this.slice(i, i + chunkSize));
	}
	return returnArray;
});

extendPrototype(Array, function split (separator, limit = this.length) {
	//Implement limit somehow?
	const chunks = [];
	const splitHere = Symbol("Split here");
	const raw = [splitHere, ...this.map(item => (typeof separator === "function" && separator(item) || separator === item) ? splitHere : item)];

	for (const item of raw) {
		if (item === splitHere) {
			chunks.push([]);
		} else {
			chunks.last().push(item);
		}
	}

	return chunks;
});

extendPrototype(Array, function merge (...others) {
	this.push(...(others.flat()));
	return this;
});

extendPrototype(Array, function reversed () {
	return this
		.clone()
		.reverse();
});

import alias from "./Alias.js";
alias(Array, "deduplicate", "unique",  false);
alias(Array, "average",     "avg",     false);
alias(Array, "reject",      "without", false);
alias(Array, "clone",       "copy",    false);
alias(Array, "deduplicate", "dedup",   false);