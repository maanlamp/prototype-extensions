"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = aliasPrototypeMethod;
function aliasPrototypeMethod(prototype, method, alias) {
	var log = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	prototype = prototype.prototype ? prototype.prototype : prototype;
	try {
		Object.defineProperty(prototype, alias, {
			value: prototype[method]
		});
		if (log) console.log("New " + prototype.constructor.name + " alias: " + prototype[method].name + " <-> " + alias);
	} catch (error) {
		throw new Error("Can't alias " + method + ":\n" + error);
	}
}