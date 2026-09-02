import assert from 'node:assert/strict';
import test from 'node:test';

test('addTagSafe should be a function', async () => {
  const exercise = await import('./spread-object-04-add-tag-safe.js');

  assert.equal(typeof exercise.addTagSafe, 'function');
});

test('addTagSafe should append tag in result', async () => {
  const exercise = await import('./spread-object-04-add-tag-safe.js');
  const source = { name: 'Alice', tags: ['dev', 'node'] };
  const result = exercise.addTagSafe(source, 'ts');

  assert.deepEqual(result.tags, ['dev', 'node', 'ts']);
});

test('addTagSafe should return a new root object', async () => {
  const exercise = await import('./spread-object-04-add-tag-safe.js');
  const source = { name: 'Alice', tags: ['dev', 'node'] };
  const result = exercise.addTagSafe(source, 'ts');

  assert.notStrictEqual(result, source);
});

test('addTagSafe should create a new tags array', async () => {
  const exercise = await import('./spread-object-04-add-tag-safe.js');
  const source = { name: 'Alice', tags: ['dev', 'node'] };
  const result = exercise.addTagSafe(source, 'ts');

  assert.notStrictEqual(result.tags, source.tags);
});

test('addTagSafe should not mutate source tags', async () => {
  const exercise = await import('./spread-object-04-add-tag-safe.js');
  const source = { name: 'Alice', tags: ['dev', 'node'] };

  exercise.addTagSafe(source, 'ts');

  assert.deepEqual(source.tags, ['dev', 'node']);
});