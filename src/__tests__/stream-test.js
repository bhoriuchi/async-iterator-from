import { describe, it } from 'mocha';
import { expect } from 'chai';
import { EventEmitter } from 'events';
import emitStream from 'emit-stream';
import { forAwaitEach } from 'iterall';
import { AsyncIterator } from '../index';

describe('Stream test', function () {
  it('should write 3 items', function (done) {
    const emitter = new EventEmitter();
    const stream = emitStream(emitter);
    const iterator = AsyncIterator.fromStream(stream);
    forAwaitEach(iterator, (value, index) => {
      expect(value[1]).to.equal(index);
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
