import cache from '../src/index';

// (function testHook() {
// 	// 自定义对象匿名函数
// 	cache.init();
// 	function Person() {
// 		this.getName = function(name) {
// 		console.log('Call' + name);
// 		}
// 	} 
// 	var p = new Person();
// 	var _p_getName = null;
// 	function mygetName(name){console.log("Hooked");}
// 	p.getName.hook("_p_getName",mygetName,p,"getName");
// 	// p.getName.unhook("_p_getName","getName",p);
// 	p.getName("pnig0s");
// })()
(function testInit() {
	function funcs() {
		this.aaaa = function() {
			console.log('a is runing');
		}
		this.b = function() {
			console.log('b is runing');
		}
	}
	const funcsInstance = new funcs();
	cache.init(funcsInstance.aaaa, 5, funcsInstance, 'aaaa');
	funcsInstance.aaaa({a: 1});
	console.log(cache.get());
	setTimeout(() => {
		funcsInstance.aaaa({a: 1});
		console.log(cache.get());
	}, 6000);
	
})()