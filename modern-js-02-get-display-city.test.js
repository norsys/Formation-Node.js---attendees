import assert from 'node:assert/strict';
import test from 'node:test';

test('getDisplayCity should be a function', async () => {
  const exercise = await import('./modern-js-02-get-display-city.js');

  assert.equal(typeof exercise.getDisplayCity, 'function');
});

test('getDisplayCity should return city when fully available', async () => {
  const exercise = await import('./modern-js-02-get-display-city.js');
  const user = { address: { city: 'Paris' } };

  const result = exercise.getDisplayCity(user, 'N/A');

  assert.equal(result, 'Paris');
});

test('getDisplayCity should return fallback when nested path is missing', async () => {
  const exercise = await import('./modern-js-02-get-display-city.js');

  const result = exercise.getDisplayCity({}, 'N/A');

  assert.equal(result, 'N/A');
});

test.only('getDisplayCity should keep empty string and not trigger fallback', async () => {
  const exercise = await import('./modern-js-02-get-display-city.js');
  const user = { address: { city: '' } };

  const result = exercise.getDisplayCity(user, 'N/A');

  assert.equal(result, '');
});

test('getDisplayCity should trigger fallback for null city', async () => {
  const exercise = await import('./modern-js-02-get-display-city.js');
  const user = { address: { city: null } };

  const result = exercise.getDisplayCity(user, 'N/A');

  assert.equal(result, 'N/A');
});
