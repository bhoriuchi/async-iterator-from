import { describe, it } from 'mocha';
import { expect } from 'chai';
import { forAwaitEach } from 'iterall';
import { AsyncIterator } from '../index';

describe('Array test', function () {
  it('should create 3 items', function (done) {
    const array = [ 0, 1, 2 ];
    const iterator = AsyncIterator.fromArray(array);
    forAwaitEach(iterator, (value, index) => {
      expect(value).to.equal(index);
      if (index === 2) {
        iterator.return();
        return done();
      }
    });
  });

  it('should add 3 items', function (done) {
    const array = [];
    const iterator = AsyncIterator.fromArray(array);
    forAwaitEach(iterator, (value, index) => {
      expect(value).to.equal(index);
      if (index === 2) {
        iterator.return();
        return done();
      }
    });

    setTimeout(() => {
      array.push(0);
      setTimeout(() => {
        array.push(1);
        setTimeout(() => {
          array.push(2);
        }, 100);
      }, 100);
    }, 100);
  });
});
