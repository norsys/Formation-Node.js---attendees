import assert from 'node:assert/strict';
import test from 'node:test';

test('withTimeout resolves when operation completes before timeout', async () => {
  const { withTimeout } = await import('./async-control-02-with-timeout.js');

  const value = await withTimeout(
    () => new Promise((resolve) => setTimeout(() => resolve('ok'), 20)),
    100
  );

  assert.equal(value, 'ok');
});

test('withTimeout rejects with timeout error when operation is too slow', async () => {
  const { withTimeout } = await import('./async-control-02-with-timeout.js');

  await assert.rejects(
    () => withTimeout(() => new Promise((resolve) => setTimeout(resolve, 120)), 10),
    /timeout/i
  );
});
