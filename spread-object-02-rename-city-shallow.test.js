import assert from 'node:assert/strict';
import test from 'node:test';

test('renameCityShallow should be a function', async () => {
  const exercise = await import('./spread-object-02-rename-city-shallow.js');

  assert.equal(typeof exercise.renameCityShallow, 'function');
});

test('renameCityShallow should return a new root object', async () => {
  const exercise = await import('./spread-object-02-rename-city-shallow.js');
  const source = { name: 'Alice', address: { city: 'Paris' } };
  const result = exercise.renameCityShallow(source, 'Lyon');

  assert.notStrictEqual(result, source);
});

test('renameCityShallow should keep the same nested address reference', async () => {
  const exercise = await import('./spread-object-02-rename-city-shallow.js');
  const source = { name: 'Alice', address: { city: 'Paris' } };
  const result = exercise.renameCityShallow(source, 'Lyon');

  assert.strictEqual(result.address, source.address);
});

test('renameCityShallow should mutate source nested city through shared reference', async () => {
  const exercise = await import('./spread-object-02-rename-city-shallow.js');
  const source = { name: 'Alice', address: { city: 'Paris' } };

  exercise.renameCityShallow(source, 'Lyon');

  assert.equal(source.address.city, 'Lyon');
});