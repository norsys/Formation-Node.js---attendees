import assert from 'node:assert/strict';
import test from 'node:test';

test('fetchWithAbort rejects immediately when signal is already aborted', async () => {
  const { fetchWithAbort } = await import('./async-control-08-fetch-with-abort.js');

  let fetchCalls = 0;
  const controller = new AbortController();
  controller.abort();

  const fetchFn = async () => {
    fetchCalls += 1;
    return "should never happen";
  }

  await assert.rejects(
    () => fetchWithAbort(fetchFn, controller.signal),
    /abort/i
  );
  assert.equal(fetchCalls, 0, "function should not be called if signal is immediatly aborted")
});

test('fetchWithAbort rejects when signal abort', async () => {
  const { fetchWithAbort } = await import('./async-control-08-fetch-with-abort.js');

  let fetchCalls = 0;
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5);

  const fetchFn = async () => {
    fetchCalls += 1;
    return new Promise((r) => setTimeout(() => r('should never happen'), 10));
  }

  await assert.rejects(
    () => fetchWithAbort(fetchFn, controller.signal),
    /abort/i
  );
  assert.equal(fetchCalls, 1, "function should have been triggered")
});

test('fetchWithAbort resolves when not aborted', async () => {
  const { fetchWithAbort } = await import('./async-control-08-fetch-with-abort.js');

  const controller = new AbortController();
  const fetchFn = async () => ({ ok: true });

  const value = await fetchWithAbort(fetchFn, controller.signal);
  assert.deepEqual(value, { ok: true });
});

test('fetchWithAbort resolves when signal is omitted', async () => {
  const { fetchWithAbort } = await import('./async-control-08-fetch-with-abort.js');

  let fetchCalls = 0;
  const fetchFn = async () => {
    fetchCalls += 1;
    return { ok: true, mode: 'no-signal' };
  };

  const value = await fetchWithAbort(fetchFn);

  assert.deepEqual(value, { ok: true, mode: 'no-signal' });
  assert.equal(fetchCalls, 1);
});
