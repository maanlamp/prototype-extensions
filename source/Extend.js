export default function extendPrototype (object, method) {
	Object.defineProperty(object.prototype || object, method.name, {
		value: method
	});
}