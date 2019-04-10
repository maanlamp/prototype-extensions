"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.extendPrototype = extendPrototype;
exports.extend = extend;
function getPrototypeOf(value) {
	return window[value].prototype || window[value];
}

function extendPrototype(object, method) {
	var configurable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	Object.defineProperty(object.prototype || object, method.name, {
		value: method,
		configurable: configurable
	});
}

function extend(prototypes) {
	Object.entries(prototypes).forEach(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    prototype = _ref2[0],
		    properties = _ref2[1];

		if (window[prototype] === undefined) throw new Error("Class '" + prototype + "' does not exist.");

		Object.values(properties).forEach(function (method) {
			return extendPrototype(getPrototypeOf(prototype), method);
		});
	});
}