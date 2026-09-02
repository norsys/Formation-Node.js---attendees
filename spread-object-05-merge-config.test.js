import assert from 'node:assert/strict';
import test from 'node:test';

test('mergeConfig should be a function', async () => {
  const exercise = await import('./spread-object-05-merge-config.js');

  assert.equal(typeof exercise.mergeConfig, 'function');
});

test('mergeConfig should prioritize top-level overrides', async () => {
  const exercise = await import('./spread-object-05-merge-config.js');
  const defaults = {
    port: 3000,
    host: 'localhost',
    features: { logging: true, metrics: false },
  };
  const overrides = {
    port: 4000,
    features: { metrics: true },
  };
  const result = exercise.mergeConfig(defaults, overrides);

  assert.equal(result.port, 4000);
});

test('mergeConfig should merge nested features', async () => {
  const exercise = await import('./spread-object-05-merge-config.js');
  const defaults = {
    port: 3000,
    host: 'localhost',
    features: { logging: true, metrics: false },
  };
  const overrides = {
    port: 4000,
    features: { metrics: true },
  };
  const result = exercise.mergeConfig(defaults, overrides);

  assert.deepEqual(result.features, { logging: true, metrics: true });
});

test('mergeConfig should create a new features object', async () => {
  const exercise = await import('./spread-object-05-merge-config.js');
  const defaults = {
    port: 3000,
    host: 'localhost',
    features: { logging: true, metrics: false },
  };
  const overrides = {
    port: 4000,
    features: { metrics: true },
  };
  const result = exercise.mergeConfig(defaults, overrides);

  assert.notStrictEqual(result.features, defaults.features);
});

test('changing result.features should not mutate defaults.features', async () => {
  const exercise = await import('./spread-object-05-merge-config.js');
  const defaults = {
    port: 3000,
    host: 'localhost',
    features: { logging: true, metrics: false },
  };
  const overrides = {
    port: 4000,
    features: { metrics: true },
  };
  const result = exercise.mergeConfig(defaults, overrides);

  result.features.logging = false;

  assert.equal(defaults.features.logging, true);
});

test('mergeConfig should keep defaults.features when overrides.features is missing', async () => {
  const exercise = await import('./spread-object-05-merge-config.js');
  const defaults = {
    port: 3000,
    host: 'localhost',
    features: { logging: true, metrics: false },
  };
  const overrides = {
    port: 4000,
  };

  const result = exercise.mergeConfig(defaults, overrides);

  assert.deepEqual(result.features, { logging: true, metrics: false });
});

test('mergeConfig should preserve falsy override values inside features', async () => {
  const exercise = await import('./spread-object-05-merge-config.js');
  const defaults = {
    features: {
      logging: true,
      retries: 3,
      label: 'default-label',
    },
  };
  const overrides = {
    features: {
      logging: false,
      retries: 0,
      label: '',
    },
  };

  const result = exercise.mergeConfig(defaults, overrides);

  assert.deepEqual(result.features, {
    logging: false,
    retries: 0,
    label: '',
  });
});