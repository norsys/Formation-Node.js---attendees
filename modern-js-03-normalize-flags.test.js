import assert from 'node:assert/strict';
import test from 'node:test';

test('normalizeFlags should be a function', async () => {
  const exercise = await import('./modern-js-03-normalize-flags.js');

  assert.equal(typeof exercise.normalizeFlags, 'function');
});

test('normalizeFlags should trim name with &&=', async () => {
  const exercise = await import('./modern-js-03-normalize-flags.js');
  const settings = {
    name: '  worker-1  ',
    retries: 2,
    timeoutMs: 500,
  };

  const result = exercise.normalizeFlags(settings);

  assert.equal(result.name, 'worker-1');
});

test('normalizeFlags should apply retries default with ||= for falsy values', async () => {
  const exercise = await import('./modern-js-03-normalize-flags.js');
  const settings = {
    name: 'service',
    retries: 0,
    timeoutMs: 500,
  };

  const result = exercise.normalizeFlags(settings);

  assert.equal(result.retries, 3);
});

test('normalizeFlags should not override timeoutMs when it is 0 thanks to ??=', async () => {
  const exercise = await import('./modern-js-03-normalize-flags.js');
  const settings = {
    name: 'service',
    retries: 1,
    timeoutMs: 0,
  };

  const result = exercise.normalizeFlags(settings);

  assert.equal(result.timeoutMs, 0);
});

test('normalizeFlags should apply timeoutMs default when nullish', async () => {
  const exercise = await import('./modern-js-03-normalize-flags.js');
  const settings = {
    name: 'service',
    retries: 1,
    timeoutMs: undefined,
  };

  const result = exercise.normalizeFlags(settings);

  assert.equal(result.timeoutMs, 1000);
});

test('normalizeFlags should not mutate source object', async () => {
  const exercise = await import('./modern-js-03-normalize-flags.js');
  const source = {
    name: '  source  ',
    retries: 0,
    timeoutMs: undefined,
  };

  const result = exercise.normalizeFlags(source);

  assert.notStrictEqual(result, source);
  assert.deepEqual(source, {
    name: '  source  ',
    retries: 0,
    timeoutMs: undefined,
  });
});
