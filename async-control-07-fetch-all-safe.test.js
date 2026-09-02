import assert from 'node:assert/strict';
import test from 'node:test';

test('fetchAllSafe collects fulfilled and rejected outcomes without throwing', async () => {
  const { fetchAllSafe } = await import('./async-control-07-fetch-all-safe.js');

  const tasks = [
    () => Promise.resolve('A'),
    () => Promise.reject(new Error('B failed')),
    () => Promise.resolve('C'),
    () => Promise.reject(new Error('D failed')),
  ];

  const result = await fetchAllSafe(tasks);

  assert.deepEqual(result.fulfilled, [
    { index: 0, value: 'A' },
    { index: 2, value: 'C' },
  ]);
  assert.equal(result.rejected.length, 2);
  assert.equal(result.rejected[0].index, 1);
  assert.match(String(result.rejected[0].error?.message), /B failed/);
  assert.equal(result.rejected[1].index, 3);
  assert.match(String(result.rejected[1].error?.message), /D failed/);
});

test('fetchAllSafe returns empty buckets when no task is provided', async () => {
  const { fetchAllSafe } = await import('./async-control-07-fetch-all-safe.js');

  const result = await fetchAllSafe([]);
  assert.deepEqual(result, { fulfilled: [], rejected: [] });
});
