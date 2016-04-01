import core from './core.js';
const hooks = new core.Hooks();
import hash from 'object-hash';
hooks.initEnv(); // add preOmit and postOmit to prototype
let cache = {};
module.exports = {
	init: function(funcs, duration, context, funcName) {
		setTimeout(() => {
			cache = {},
			duration * 1000
		});
		const temp = null; // name for unhook
		funcs.preOmit("temp", this.preOmitFunc, context, funcName);
		funcs.postOmit("temp", this.postOmitFunc, context, funcName);
	},
	get: function() {
		return cache;
	},
	preOmitFunc: function(payload) {
		console.log('pre');
		if (cache[hash(payload)]) {
			console.log('cached');
			// console.log(cache[hash(payload)]);
			return cache[hash(payload)];
		}
	},
	postOmitFunc: function(payload) {
		console.log('post');
		if (!cache[hash(payload)]) {
			cache[hash(payload)] = payload
		}
	}
};