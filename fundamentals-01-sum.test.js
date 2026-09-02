import assert from 'node:assert/strict';
import test from 'node:test';


test('should sum all values in the array parameter', async () => {
  const exercise = await import('./fundamentals-01-sum.js');

  assert.equal(typeof exercise.sum, 'function', 'sum must be a function');
  assert.equal(exercise.sum([1, 2, 3, 4]), 10);
});

test('should sum all of it\'s parameter', async () => {
  const exercise = await import('./fundamentals-01-sum.js');

  assert.equal(typeof exercise.sum2, 'function', 'sum2 must be a function');
  assert.equal(exercise.sum2(1, 2, 3, 4), 10);
});