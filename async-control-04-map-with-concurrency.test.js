import assert from 'node:assert/strict';
import test from 'node:test';

test('mapWithConcurrency limits active jobs and preserves output order', async () => {
  const { mapWithConcurrency } = await import('./async-control-04-map-with-concurrency.js');

  const active = { current: 0, max: 0 };
  const delays = [40, 10, 30, 5, 20];

  const result = await mapWithConcurrency(delays, 2, async (ms, index) => {
    active.current += 1;
    active.max = Math.max(active.max, active.current);

    await new Promise((resolve) => setTimeout(resolve, ms));

    active.current -= 1;
    return `job-${index}`;
  });

  assert.deepEqual(result, ['job-0', 'job-1', 'job-2', 'job-3', 'job-4']);
  assert.equal(active.max, 2, 'must run exactly 2 jobs concurrently');
});

test('mapWithConcurrency rejects when one task fails', async () => {
  const { mapWithConcurrency } = await import('./async-control-04-map-with-concurrency.js');

  await assert.rejects(
    () =>
      mapWithConcurrency([1, 2, 3], 2, async (value) => {
        if (value === 2) {
          throw new Error('boom');
        }
        return value;
      }),
    /boom/
  );
});
