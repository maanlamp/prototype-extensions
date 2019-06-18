function toNumber(value) {
	const num = Number(value);
	return Number.isNaN(num)
		? 0
		: num;
}

function singleItemOrArray (array) {
	return (array.length === 1)
		? array[0]
		: array;
}

export function average () {
	return this.reduce((total, current) => total += toNumber(current)) / this.length;
}

export function pluck (value) {
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
}

export function reject (value) {
	const pluckedValues = this.pluck(value);
	return this.filter(element => !pluckedValues.includes(element));
}

export function max () {
	return this.reduce((max, current) => Math.max(max, toNumber(current)), toNumber(this[0]));
}

export function min () {
	return this.reduce((min, current) => Math.min(min, toNumber(current)), toNumber(this[0]));
}

export function first ( count = 1) {
	return singleItemOrArray(this.slice(0, count));
}

export function last (count = 1) {
	return singleItemOrArray(this.slice(-count));
}

export function clone () {
	return this.slice();
}

export function remove (from, to = from + 1) {
	this.splice(from, to);
	return this;
}

export function clear () {
	this.length = 0;
	return this;
}

export function grab (start, end = start + 1) {
	return singleItemOrArray(this.splice(start, end - start));
}

export function deduplicate () {
	return [...new Set(this)];
}

export function mapAsync (callback) {
	return Promise.all(this.map(callback));
}

export function filterAsync (predicate) {
	const toFilter = Symbol();
	return this.mapAsync(async item => (await predicate(item) && item) || toFilter).then(results => {
		return results.filter(item => item !== toFilter);
	});
}

export function chunkify (chunkSize = 1) {
	const returnArray = [];
	for (let i = 0; i < this.length; i += chunkSize) {
		returnArray.push(this.slice(i, i + chunkSize));
	}
	return returnArray;
}

export function split (separator, limit = this.length) {
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
}

export function merge (...others) {
	this.push(...others.flat());
	return this;
}

export function reversed () {
	return this
		.clone()
		.reverse();
}

export function sortBy (property) {
	if (property instanceof Function) return this.sort((a, b) => -(property(a) - property(b)));
	return this.sort((a, b) => -(a[property] - b[property]));
}

//Aliases
export const unique  = deduplicate;
export const avg     = average;
export const without = reject;
export const copy    = clone;
export const dedup   = deduplicate;