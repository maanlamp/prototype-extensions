"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = extendPrototype;
function extendPrototype(prototype, method) {
	Object.defineProperty(prototype.prototype ? prototype.prototype : prototype, method.name, {
		value: method
	});
}