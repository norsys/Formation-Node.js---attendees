import assert from 'node:assert/strict';
import test from 'node:test';

test('onceCallbackToPromise resolves with the first callback invocation only', async () => {
  const { onceCallbackToPromise } = await import('./async-interop-01-once-callback-to-promise.js');

  const operation = (cb) => {
    cb(null, 'first');
    cb(null, 'second');
  };

  const value = await onceCallbackToPromise(operation);
  assert.equal(value, 'first');
});

test('onceCallbackToPromise rejects if first callback call contains an error', async () => {
  const { onceCallbackToPromise } = await import('./async-interop-01-once-callback-to-promise.js');

  const operation = (cb) => {
    cb(new Error('first failure'));
    cb(null, 'late success');
  };

  await assert.rejects(() => onceCallbackToPromise(operation), /first failure/);
});
