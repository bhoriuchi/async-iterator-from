# async-iterator-from
Create async iterators from Arrays, EventEmitters, and Streams

### Impractical Example

```js
import { AsyncIterator } from 'async-iterator-from';
import { forAwaitEach } from 'iterall';

const array = [];
const iterator = AsyncIterator.fromArray(array);

forAwaitEach(iterator, value => {
  console.log(value);
});

array.push('a');
// a
array.push('b');
// b

```

### RethinkDB Changefeed Example

```js
import rdash from 'rethinkdbdash';
import { AsyncIterator } from 'async-iterator-from';
import { forAwaitEach } from 'iterall';

const r = rdash();
const array = [];
const iterator = AsyncIterator.fromArray(array);

forAwaitEach(iterator, value => {
  console.log(value);
});

r.table('foo').changes().run().then(cursor => {
  return cursor.each((error, change) => {
    if (error) {
      return iterator.throw(error);
    }
    array.push(change);
  });
});
```

## API

### IteratorOptions

Iterator options are the same for all methods and are described below.

* `[options.debounce]` **{Number}** Adds a debounce time in ms for new data to be added
to the queue.
* `[options.onThrow]` **{Function}** Function to be called when the `throw` method is called. Takes the error thrown as its only argument.
* `[options.onReturn]` **{Function}** Function to be called when the `return` method is called.
* `[options.onNext]` **{Function}** Function to be called when the `next` method is called.
* `[options.onPush]` **{Function}** Function to be called when a new value is pushed to the queue. Takes the value as its only argument.
* `[options.onEnd]` **{Function}** Function to be called when the `throw` or `return` methods are called.

---

### `AsyncIterator ([values] [, options])`

Creates a new `AsyncIterator`

**Parameters**

* `[values=[]]` **{Array}** An array to pull the initial values of the iterator from.
Additionally, the `push` method of the `values` array will be overriden to allow 
additional values to be added to the iterator.
* `[options]` **{IteratorOptions}** Options for iterator setup.

---

### `.fromArray (values [, options])`

Creates a new `AsyncIterator` from an `Array`. This is a convienience method and is the equivalent of calling new on the `AsyncIterator` class. Can also be imported with `import { fromArray } from 'async-iterator-from'`

**Parameters**

* `values` **{Array}** An array to pull the initial values of the iterator from.
Additionally, the `push` method of the `values` array will be overriden to allow 
additional values to be added to the iterator.
* `[options]` **{IteratorOptions}** Options for iterator setup.

---

### `.fromEvent (emitter, event [, options])`

Creates a new `AsyncIterator` from an `EventEmitter`. Can also be imported with `import { fromEvent } from 'async-iterator-from'`

**Parameters**

* `emitter` **{EventEmitter}** `EventEmitter` to listen on for data.
* `event` **{String}** event name to listen for.
* `[options]` **{IteratorOptions}** Options for iterator setup.

---

### `.fromStream (stream [, options])`

Creates a new `AsyncIterator` from an `EventEmitter`. Can also be imported with `import { fromStream } from 'async-iterator-from'`

**Parameters**

* `stream` **{Stream}** `Stream` to listen on for data.
* `[options]` **{IteratorOptions}** Options for iterator setup.
