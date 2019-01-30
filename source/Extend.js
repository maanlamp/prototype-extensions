export default function extendPrototype (object, method, configurable = false) {
	Object.defineProperty(object.prototype || object, method.name, {
		value: method,
		configurable
	});
}