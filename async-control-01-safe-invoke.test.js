import assert from 'node:assert/strict';
import test from 'node:test';

test('safeInvoke resolves sync return values', async () => {
  const { safeInvoke } = await import('./async-control-01-safe-invoke.js');

  const value = await safeInvoke(() => 123);
  assert.equal(value, 123);
});

test('safeInvoke resolves async return values', async () => {
  const { safeInvoke } = await import('./async-control-01-safe-invoke.js');

  const value = await safeInvoke(() => Promise.resolve(123));
  assert.equal(value, 123);
});

test('safeInvoke rejects on synchronous throw', async () => {
  const { safeInvoke } = await import('./async-control-01-safe-invoke.js');

  await assert.rejects(() => safeInvoke(() => {
    throw new Error('sync fail');
  }), /sync fail/);
});

test('safeInvoke rejects on asynchronous rejection', async () => {
  const { safeInvoke } = await import('./async-control-01-safe-invoke.js');

  await assert.rejects(
    () => safeInvoke(async () => {
      throw new Error('async fail');
    }),
    /async fail/
  );
});
