import assert from 'node:assert/strict';
import test from 'node:test';

test('setLatSafeV1 should be a function', async () => {
  const exercise = await import('./spread-object-06-set-lat-safe.js');

  assert.equal(typeof exercise.setLatSafeV1, 'function');
});

test('setLatSafeV1 should return a new root object', async () => {
  const exercise = await import('./spread-object-06-set-lat-safe.js');
  const source = {
    name: 'Alice',
    address: { city: 'Paris', geo: { lat: 48.8566, lng: 2.3522 } },
  };
  const result = exercise.setLatSafeV1(source, 45.764);

  assert.notStrictEqual(result, source);
});

test('setLatSafeV1 should create a new address object', async () => {
  const exercise = await import('./spread-object-06-set-lat-safe.js');
  const source = {
    name: 'Alice',
    address: { city: 'Paris', geo: { lat: 48.8566, lng: 2.3522 } },
  };
  const result = exercise.setLatSafeV1(source, 45.764);

  assert.notStrictEqual(result.address, source.address);
});

test('setLatSafeV1 should keep the same geo reference', async () => {
  const exercise = await import('./spread-object-06-set-lat-safe.js');
  const source = {
    name: 'Alice',
    address: { city: 'Paris', geo: { lat: 48.8566, lng: 2.3522 } },
  };
  const result = exercise.setLatSafeV1(source, 45.764);

  assert.strictEqual(result.address.geo, source.address.geo);
});

test('setLatSafeV1 should mutate source geo.lat through shared geo reference', async () => {
  const exercise = await import('./spread-object-06-set-lat-safe.js');
  const source = {
    name: 'Alice',
    address: { city: 'Paris', geo: { lat: 48.8566, lng: 2.3522 } },
  };

  exercise.setLatSafeV1(source, 45.764);

  assert.equal(source.address.geo.lat, 45.764);
});

test('setLatSafeV2 should be a function', async () => {
  const exercise = await import('./spread-object-06-set-lat-safe.js');

  assert.equal(typeof exercise.setLatSafeV2, 'function');
});

test('setLatSafeV2 should return a new root object', async () => {
  const exercise = await import('./spread-object-06-set-lat-safe.js');
  const source = {
    name: 'Alice',
    address: { city: 'Paris', geo: { lat: 48.8566, lng: 2.3522 } },
  };
  const result = exercise.setLatSafeV2(source, 45.764);

  assert.notStrictEqual(result, source);
});

test('setLatSafeV2 should create a new address object', async () => {
  const exercise = await import('./spread-object-06-set-lat-safe.js');
  const source = {
    name: 'Alice',
    address: { city: 'Paris', geo: { lat: 48.8566, lng: 2.3522 } },
  };
  const result = exercise.setLatSafeV2(source, 45.764);

  assert.notStrictEqual(result.address, source.address);
});

test('setLatSafeV2 should create a new geo object', async () => {
  const exercise = await import('./spread-object-06-set-lat-safe.js');
  const source = {
    name: 'Alice',
    address: { city: 'Paris', geo: { lat: 48.8566, lng: 2.3522 } },
  };
  const result = exercise.setLatSafeV2(source, 45.764);

  assert.notStrictEqual(result.address.geo, source.address.geo);
});

test('setLatSafeV2 should keep source geo.lat unchanged', async () => {
  const exercise = await import('./spread-object-06-set-lat-safe.js');
  const source = {
    name: 'Alice',
    address: { city: 'Paris', geo: { lat: 48.8566, lng: 2.3522 } },
  };

  exercise.setLatSafeV2(source, 45.764);

  assert.equal(source.address.geo.lat, 48.8566);
});

test('setLatSafeV2 should update result geo.lat', async () => {
  const exercise = await import('./spread-object-06-set-lat-safe.js');
  const source = {
    name: 'Alice',
    address: { city: 'Paris', geo: { lat: 48.8566, lng: 2.3522 } },
  };
  const result = exercise.setLatSafeV2(source, 45.764);

  assert.equal(result.address.geo.lat, 45.764);
});