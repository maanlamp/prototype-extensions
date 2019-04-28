// export default function alias (method, prototype) {
// 	const temp = ({[alias]: method});
// 	return (prototype !== undefined)
// 		? temp[alias]
// 		: temp[alias].bind(prototype.prototype || prototype);
// }