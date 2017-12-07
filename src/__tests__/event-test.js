import { describe, it } from 'mocha';
import { expect } from 'chai';
import { EventEmitter } from 'events';
import { forAwaitEach } from 'iterall';
import AsyncIterator from '../index';

describe('Event test', function () {
  it('should create 3 events', function (done) {
    const emitter = new EventEmitter();
    const iterator = AsyncIterator.fromEvent(emitter, 'data');
    forAwaitEach(iterator, (value, index) => {
      expect(value).to.equal(index);
      if (index === 2) {
        iterator.return();
        return done();
      }
    });

    setTimeout(() => {
      emitter.emit('data', 0);
      setTimeout(() => {
        emitter.emit('data', 1);
        setTimeout(() => {
          emitter.emit('data', 2);
        }, 100);
      }, 100);
    }, 100);
  });
});
