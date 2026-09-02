import assert from 'node:assert/strict';
import test from 'node:test';

test('renameCitySafe should be a function', async () => {
  const exercise = await import('./spread-object-03-rename-city-safe.js');

  assert.equal(typeof exercise.renameCitySafe, 'function');
});

test('renameCitySafe should return a new root object', async () => {
  const exercise = await import('./spread-object-03-rename-city-safe.js');
  const source = { name: 'Alice', address: { city: 'Paris' } };
  const result = exercise.renameCitySafe(source, 'Lyon');

  assert.notStrictEqual(result, source);
});

test('renameCitySafe should create a new address object', async () => {
  const exercise = await import('./spread-object-03-rename-city-safe.js');
  const source = { name: 'Alice', address: { city: 'Paris' } };
  const result = exercise.renameCitySafe(source, 'Lyon');

  assert.notStrictEqual(result.address, source.address);
});

test('renameCitySafe should keep source city unchanged', async () => {
  const exercise = await import('./spread-object-03-rename-city-safe.js');
  const source = { name: 'Alice', address: { city: 'Paris' } };

  exercise.renameCitySafe(source, 'Lyon');

  assert.equal(source.address.city, 'Paris');
});

test('renameCitySafe should update result city', async () => {
  const exercise = await import('./spread-object-03-rename-city-safe.js');
  const source = { name: 'Alice', address: { city: 'Paris' } };
  const result = exercise.renameCitySafe(source, 'Lyon');

  assert.equal(result.address.city, 'Lyon');
});