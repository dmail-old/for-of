require('@dmail/symbol');

module.exports = function(iterable, fn, bind){
	var method, iterator, next;

	method = iterable[Symbol.iterator];

	if( typeof method !== 'function' ){
		throw new TypeError(iterable + 'is not iterable');
	}

	if( typeof fn != 'function' ){
		throw new TypeError('second argument must be a function');
	}

	iterator = method.call(iterable);
	next = iterator.next();
	while( next.done === false ){
		if( fn.call(bind, next.value) === true ){
			if( typeof iterator['return'] === 'function' ){
				iterator['return']();
			}
			break;
		}
		next = iterator.next();
	}

	return this;
};
