import * as LibPost from '../../lib/posts';
import path from 'path';

beforeEach(() => {
  const mockPostsDirectory = jest.spyOn(LibPost, 'postsDirectory');
  mockPostsDirectory.mockImplementation(() => {
    return path.join(process.cwd(), '__test__/posts');
  });
});

test('getAllPostIds', () => {
  const postIds = [
    { params: { id: 'empty_post' } },
    { params: { id: 'hiphen-post' } },
    { params: { id: 'new_post' } },
    { params: { id: 'old_post' } },
    { params: { id: 'normal_post' } },
    { params: { id: 'old_post' } },
  ];
  expect(LibPost.getAllPostIds()).toBe(postIds);
});

test('getPostSummary', () => {
  const postSummary: LibPost.PostSummary = {
    id: 'normal_post',
    title: 'Test',
    date: '2022-01-01',
  };
  expect(LibPost.getPostSummary('normal_post')).toBe(postSummary);
});
