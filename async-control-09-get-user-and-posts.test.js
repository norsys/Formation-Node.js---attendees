import assert from 'node:assert/strict';
import test from 'node:test';

test('getUserAndPosts returns merged payload from two async sources', async () => {
  const { getUserAndPosts } = await import('./async-control-09-get-user-and-posts.js');

  const fetchUser = async () => ({ id: 42, name: 'Ada' });
  const fetchPosts = async (userId) => [
    { id: 1, userId, title: 'Post A' },
    { id: 2, userId, title: 'Post B' },
  ];

  const result = await getUserAndPosts(fetchUser, fetchPosts);

  assert.deepEqual(result, {
    user: { id: 42, name: 'Ada' },
    posts: [
      { id: 1, userId: 42, title: 'Post A' },
      { id: 2, userId: 42, title: 'Post B' },
    ],
  });
});

test('getUserAndPosts propagates fetchPosts errors', async () => {
  const { getUserAndPosts } = await import('./async-control-09-get-user-and-posts.js');

  const fetchUser = async () => ({ id: 7, name: 'Lin' });
  const fetchPosts = async () => {
    throw new Error('posts failed');
  };

  await assert.rejects(() => getUserAndPosts(fetchUser, fetchPosts), /posts failed/);
});
