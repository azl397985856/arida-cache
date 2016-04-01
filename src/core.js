module.exports = {
	Hooks: function(window)
{
	return {
		initEnv:function () {
			function preFunc() {

			}
			Function.prototype.preOmit = function (realFunc,preOmit,context,funcName) {
				preFunc = preOmit;
				var _context = null; 
				var _funcName = null; 

				_context = context || global || window;
				_funcName = funcName || getFuncName(this);
				_context[realFunc] = this;


				function getFuncName (fn) {
					var strFunc = fn.toString();
					var _regex = /function\s+(\w+)\s*\(/;
					var patten = strFunc.match(_regex);
					if (patten) {
						return patten[1];
					};
					return '';
				}

				try
				{
					eval('_context[_funcName] = function '+_funcName+'(){\n'+
						'var args = Array.prototype.slice.call(arguments,0);\n'+
						'preOmit.apply(this,args)\n'+
						'_context[realFunc].apply(this,args);\n'+
						'};');
					return true;
				}catch (e)
				{
					console.log("preOmit failed,please check the params and try again");
					return false;
				}
			}
			Function.prototype.postOmit = function (realFunc,postOmit,context,funcName) {
				var _context = null; 
				var _funcName = null; 

				_context = context || global || window;
				_funcName = funcName || getFuncName(this);
				_context[realFunc] = this;


				function getFuncName (fn) {
					var strFunc = fn.toString();
					var _regex = /function\s+(\w+)\s*\(/;
					var patten = strFunc.match(_regex);
					if (patten) {
						return patten[1];
					};
					return '';
				}

				try
				{
					eval('_context[_funcName] = function '+_funcName+'(){\n'+
						'var args = Array.prototype.slice.call(arguments,0);\n'+
						'var result = preFunc.apply(this,args);\n'+
						'if (result) {return true;}\n' +
						'_context[realFunc].apply(this,args);\n'+
						'postOmit.apply(this,args)\n'+
						'};');
					return true;
				}catch (e)
				{
					console.log("postOmit failed,please check the params and try again");
					return false;
				}
			}
		},
	};
}
}