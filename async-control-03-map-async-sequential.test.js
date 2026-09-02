import assert from 'node:assert/strict';
import test from 'node:test';

test('mapAsyncSequential executes tasks in strict sequence and preserves order', async () => {
  const { mapAsyncSequential } = await import('./async-control-03-map-async-sequential.js');
  const trace = [];

  const result = await mapAsyncSequential([30, 10, 20], async (ms, index) => {
    trace.push(`start-${index}`);
    await new Promise((resolve) => setTimeout(resolve, ms));
    trace.push(`end-${index}`);
    return index * 2;
  });

  assert.deepEqual(result, [0, 2, 4]);
  assert.deepEqual(trace, [
    'start-0',
    'end-0',
    'start-1',
    'end-1',
    'start-2',
    'end-2',
  ]);
});

test('mapAsyncSequential stops on first error', async () => {
  const { mapAsyncSequential } = await import('./async-control-03-map-async-sequential.js');
  const trace = [];

  await assert.rejects(
    () =>
      mapAsyncSequential([1, 2, 3], async (value) => {
        trace.push(value);
        if (value === 2) {
          throw new Error('boom');
        }
        return value;
      }),
    /boom/
  );

  assert.deepEqual(trace, [1, 2]);
});
