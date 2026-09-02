import assert from 'node:assert/strict';
import test from 'node:test';

test('formatUserLabel should be a function', async () => {
  const exercise = await import('./modern-js-01-format-user-label.js');

  assert.equal(typeof exercise.formatUserLabel, 'function');
});

test('formatUserLabel should format values from nested properties', async () => {
  const exercise = await import('./modern-js-01-format-user-label.js');
  const user = {
    id: 7,
    role: 'admin',
    profile: {
      firstName: 'Ada',
      lastName: 'Lovelace',
      stats: { score: 99 },
    },
  };

  const result = exercise.formatUserLabel(user);

  assert.equal(result, 'Ada Lovelace (#7) - admin [score=99]');
});

test('formatUserLabel should use defaults when nested values are missing', async () => {
  const exercise = await import('./modern-js-01-format-user-label.js');
  const user = {
    profile: {
      firstName: 'Lin',
      lastName: 'Q',
    },
  };

  const result = exercise.formatUserLabel(user);

  assert.equal(result, 'Lin Q (#unknown) - member [score=0]');
});

test('formatUserLabel should apply default values for undefined properties', async () => {
  const exercise = await import('./modern-js-01-format-user-label.js');
  const user = {
    id: undefined,
    role: undefined,
    profile: {
      firstName: 'Sam',
      lastName: 'M',
      stats: { score: undefined },
    },
  };

  const result = exercise.formatUserLabel(user);

  assert.equal(result, 'Sam M (#unknown) - member [score=0]');
});
