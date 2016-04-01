'use strict';

var _core = require('./core.js');

var _core2 = _interopRequireDefault(_core);

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hooks = new _core2.default.Hooks();

hooks.initEnv(); // add preOmit and postOmit to prototype
var cache = {};
module.exports = {
	init: function init(funcs, duration, context, funcName) {
		setTimeout(function () {
			cache = {}, duration * 1000;
		});
		var temp = null; // name for unhook
		funcs.preOmit("temp", this.preOmitFunc, context, funcName);
		funcs.postOmit("temp", this.postOmitFunc, context, funcName);
	},
	get: function get() {
		return cache;
	},
	preOmitFunc: function preOmitFunc(payload) {
		console.log('pre');
		if (cache[(0, _objectHash2.default)(payload)]) {
			console.log('cached');
			// console.log(cache[hash(payload)]);
			return cache[(0, _objectHash2.default)(payload)];
		}
	},
	postOmitFunc: function postOmitFunc(payload) {
		console.log('post');
		if (!cache[(0, _objectHash2.default)(payload)]) {
			cache[(0, _objectHash2.default)(payload)] = payload;
		}
	}
};