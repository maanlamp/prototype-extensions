function getPrototypeOf (value) {
	return window[value].prototype || window[value];
}

export function extendPrototype (object, method, configurable = false) {
	Object.defineProperty(object.prototype || object, method.name, {
		value: method,
		configurable
	});
}

export function extend (prototypes) {
	Object.entries(prototypes)
		.forEach(([prototype, properties]) => {
			if (window[prototype] === undefined) throw new Error(`Class '${prototype}' does not exist.`);

			Object.values(properties)
				.forEach(method => extendPrototype(
					getPrototypeOf(prototype),
					method));
		});
}