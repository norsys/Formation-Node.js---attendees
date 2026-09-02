import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import test from 'node:test';

test('waitForEvent resolves with payload and cleans up listeners', async () => {
  const { waitForEvent } = await import('./event-loop-02-wait-for-event.js');

  const emitter = new EventEmitter();
  const promise = waitForEvent(emitter, 'ready', 100);

  emitter.emit('ready', { ok: true });
  const payload = await promise;

  assert.deepEqual(payload, { ok: true });
  assert.equal(emitter.listenerCount('ready'), 0);
  assert.equal(emitter.listenerCount('error'), 0);
});

test('waitForEvent rejects on timeout and cleans up listeners', async () => {
  const { waitForEvent } = await import('./event-loop-02-wait-for-event.js');

  const emitter = new EventEmitter();

  await assert.rejects(
    () => waitForEvent(emitter, 'ready', 5),
    /timeout/i
  );

  assert.equal(emitter.listenerCount('ready'), 0);
  assert.equal(emitter.listenerCount('error'), 0);
});
