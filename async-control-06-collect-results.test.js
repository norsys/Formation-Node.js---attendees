import assert from 'node:assert/strict';
import test from 'node:test';

test('collectResults returns tagged outcome for each promise', async () => {
  const { collectResults } = await import('./async-control-06-collect-results.js');

  const promises = [
    Promise.resolve('A'),
    Promise.reject(new Error('B failed')),
    Promise.resolve('C'),
  ];

  const result = await collectResults(promises);

  assert.equal(result.length, 3);
  assert.deepEqual(result[0], { ok: true, value: 'A' });
  assert.equal(result[1].ok, false);
  assert.match(String(result[1].error?.message), /B failed/);
  assert.deepEqual(result[2], { ok: true, value: 'C' });
});
