import { vi } from 'vitest';
import {
  getSortedPostSummaries,
  getAllPostIds,
  getPostSummary,
  getPost,
  InvalidIdError,
  PostSummary,
  Post,
} from './posts';

vi.mock('marked', () => ({
  Marked: class {
    use() {}
    async parse() {
      return '<p>Mocked HTML</p>';
    }
  },
}));

vi.mock('marked-highlight', () => ({
  markedHighlight: vi.fn(),
}));

vi.mock('highlight.js', () => ({
  getLanguage: vi.fn().mockReturnValue(true),
  highlight: vi.fn().mockReturnValue({ value: 'highlighted code' }),
}));

vi.mock('sanitize-html', () => ({
  default: vi.fn((html) => html),
}));

describe('posts lib', () => {
  describe('getAllPostIds', () => {
    it('すべての投稿IDを取得できる', () => {
      const postIds = getAllPostIds();
      expect(postIds.length).toBeGreaterThan(0);
      postIds.forEach((p) => {
        expect(typeof p.id).toBe('string');
        expect(p.id).toMatch(/^[\w-]+$/);
      });
    });
  });

  describe('getSortedPostSummaries', () => {
    it('投稿サマリーが日付降順にソートされている', () => {
      const summaries = getSortedPostSummaries();
      expect(summaries.length).toBeGreaterThan(0);

      for (let i = 0; i < summaries.length - 1; i++) {
        expect(summaries[i].date >= summaries[i + 1].date).toBe(true);
      }
    });

    it('各サマリーに必要なプロパティが含まれる', () => {
      const summaries = getSortedPostSummaries();
      summaries.forEach((summary: PostSummary) => {
        expect(summary).toHaveProperty('id');
        expect(summary).toHaveProperty('title');
        expect(summary).toHaveProperty('date');
        expect(summary).toHaveProperty('author');
      });
    });
  });

  describe('getPostSummary', () => {
    it('特定の投稿のサマリーを取得できる', () => {
      const postIds = getAllPostIds();
      const summary = getPostSummary(postIds[0].id);
      expect(summary.id).toBe(postIds[0].id);
      expect(summary).toHaveProperty('title');
      expect(summary).toHaveProperty('date');
      expect(summary).toHaveProperty('author');
    });

    it('不正なIDでエラーが発生する', () => {
      expect(() => getPostSummary('../etc/passwd')).toThrow(InvalidIdError);
      expect(() => getPostSummary('../../secret')).toThrow(InvalidIdError);
      expect(() => getPostSummary('foo/bar')).toThrow(InvalidIdError);
      expect(() => getPostSummary('')).toThrow(InvalidIdError);
    });
  });

  describe('getPost', () => {
    it('特定の投稿の詳細を取得できる', async () => {
      const postIds = getAllPostIds();
      const post: Post = await getPost(postIds[0].id);
      expect(post.id).toBe(postIds[0].id);
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('author');
      expect(post.contentHtml).toBeDefined();
      expect(typeof post.contentHtml).toBe('string');
      expect(post.contentHtml.length).toBeGreaterThan(0);
    });

    it('不正なIDでエラーが発生する', async () => {
      await expect(getPost('../etc/passwd')).rejects.toThrow(InvalidIdError);
    });
  });
});
