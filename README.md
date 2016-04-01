## Introduction
A libabry for caching your client data
## Install

```bash
npm install arida-cache
```

## Usage example

``` javascript
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
```
Run the example above, you will get result below:
pre
a is runing
post
{ ca1a41f90da606b052ecf10c8286817813bc8861: { a: 1 } }
pre
a is runing
post
{ ca1a41f90da606b052ecf10c8286817813bc8861: { a: 1 } }

## API
The following is an incomplete list of arida API. It should give you a general concept of arida's usage.

- `.init: function(funcs, duration, context, funcName): config the cache 
funcs present the func will be hooked
duration set the cache's duration
context should be assign if not in window or global
funcName  must be assign otherwise not anyoumous
- `.get()`: Returns cache;

## Contributing

We welcome all contributions, please submit any ideas as [pull requests](https://github.com/azl397985856/arida-cache/pulls) or as a [GitHub issue](https://github.com/azl397985856/arida-cache/issues).
## Licence
MIT
