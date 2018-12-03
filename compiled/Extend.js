"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = extendPrototype;
function extendPrototype(object, method) {
	Object.defineProperty(object.prototype || object, method.name, {
		value: method
	});
}