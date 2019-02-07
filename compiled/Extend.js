"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = extendPrototype;
function extendPrototype(object, method) {
	var configurable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	Object.defineProperty(object.prototype || object, method.name, {
		value: method,
		configurable: configurable
	});
}