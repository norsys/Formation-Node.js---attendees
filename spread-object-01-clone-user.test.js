import assert from 'node:assert/strict';
import test from 'node:test';

test('cloneUser should be a function', async () => {
  const exercise = await import('./spread-object-01-clone-user.js');

  assert.equal(typeof exercise.cloneUser, 'function');
});

test('cloneUser should return a new object reference', async () => {
  const exercise = await import('./spread-object-01-clone-user.js');
  const source = { id: 1, name: 'Alice', role: 'dev' };
  const result = exercise.cloneUser(source);

  assert.notStrictEqual(result, source);
});

test('cloneUser should preserve top-level primitive values', async () => {
  const exercise = await import('./spread-object-01-clone-user.js');
  const source = { id: 1, name: 'Alice', role: 'dev' };
  const result = exercise.cloneUser(source);

  assert.deepEqual(result, source);
});

test('changing a top-level property on clone should not mutate source', async () => {
  const exercise = await import('./spread-object-01-clone-user.js');
  const source = { id: 1, name: 'Alice', role: 'dev' };
  const result = exercise.cloneUser(source);

  result.name = 'Bob';

  assert.equal(source.name, 'Alice');
});