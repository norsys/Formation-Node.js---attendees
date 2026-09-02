import assert from 'node:assert/strict';
import test from 'node:test';

test('retry eventually resolves when a later attempt succeeds', async () => {
  const { retry } = await import('./async-control-05-retry.js');
  let attempts = 0;

  const result = await retry(async () => {
    attempts += 1;
    if (attempts < 3) {
      throw new Error(`failed-${attempts}`);
    }
    return 'ok';
  }, { retries: 3, delayMs: 1 });

  assert.equal(result, 'ok');
  assert.equal(attempts, 3);
});

test('retry rejects with last error after retries are exhausted', async () => {
  const { retry } = await import('./async-control-05-retry.js');
  let attempts = 0;

  await assert.rejects(
    () =>
      retry(async () => {
        attempts += 1;
        throw new Error(`failed-${attempts}`);
      }, { retries: 2, delayMs: 1 }),
    /failed-3/
  );

  assert.equal(attempts, 3);
});
