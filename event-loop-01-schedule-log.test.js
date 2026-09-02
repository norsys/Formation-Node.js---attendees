import assert from 'node:assert/strict';
import test from 'node:test';

test('scheduleLog enforces microtask before macrotask order', async () => {
  const { scheduleLog } = await import('./event-loop-01-schedule-log.js');
  const messages = [];

  const maybePromise = scheduleLog((msg) => messages.push(msg));

  assert.deepEqual(messages, [
    'sync',
  ]);

  await Promise.resolve(maybePromise);

  assert.deepEqual(messages, [
    'sync',
    'microtask',
  ]);

  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.deepEqual(messages, [
    'sync',
    'microtask',
    'macrotask',
  ]);
});
