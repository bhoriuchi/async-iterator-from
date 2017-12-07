import { describe, it } from 'mocha';
import { expect } from 'chai';
import { EventEmitter } from 'events';
import { forAwaitEach } from 'iterall';
import AsyncIterator from '../index';

describe('Debounce test', function () {
  it('should enforce debounce', function (done) {
    const emitter = new EventEmitter();
    const iterator = AsyncIterator
      .fromEvent(emitter, 'data', { debounce: 100 });
    forAwaitEach(iterator, (value, index) => {
      expect(value).to.equal(index);
      if (index === 2) {
        iterator.return();
        return done();
      }
    });

    setTimeout(() => {
      for (let i = 100; i >= 0; i--) {
        emitter.emit('data', i);
      }
      setTimeout(() => {
        for (let j = 100; j >= 1; j--) {
          emitter.emit('data', j);
        }
        setTimeout(() => {
          for (let k = 100; k >= 2; k--) {
            emitter.emit('data', k);
          }
        }, 100);
      }, 100);
    }, 100);
  });
});
