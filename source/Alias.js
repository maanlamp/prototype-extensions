export default function aliasPrototypeMethod (prototype, method, alias, log) {
	prototype = (prototype.prototype) ? prototype.prototype : prototype;
	try {
		Object.defineProperty(prototype, alias, {
			value: prototype[method]
		});
		if (log) console.log(`New ${prototype.constructor.name} alias: ${prototype[method].name} <-> ${alias}`);
	} catch (error) {
		throw new Error(`Can't alias ${method}:\n${error}`);
	}
}