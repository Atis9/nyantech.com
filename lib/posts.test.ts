import {
  getSortedPostSummaries,
  getAllPostIds,
  getPostSummary,
  getPost,
  PostSummary,
  Post,
} from './posts';

jest.mock('marked', () => ({
  Marked: jest.fn().mockImplementation(() => ({
    use: jest.fn(),
    parse: jest.fn().mockResolvedValue('<p>Mocked HTML</p>'),
  })),
}));

jest.mock('marked-highlight', () => ({
  markedHighlight: jest.fn(),
}));

jest.mock('highlight.js', () => ({
  getLanguage: jest.fn().mockReturnValue(true),
  highlight: jest.fn().mockReturnValue({ value: 'highlighted code' }),
}));

jest.mock('sanitize-html', () => jest.fn((html) => html));

describe('posts lib', () => {
  describe('getAllPostIds', () => {
    it('すべての投稿IDを取得できる', () => {
      const postIds = getAllPostIds();
      expect(postIds.length).toBeGreaterThan(0);
      expect(postIds.every((p) => p.id)).toBeTruthy();
    });

    it('各投稿IDが文字列である', () => {
      const postIds = getAllPostIds();
      postIds.forEach((p) => {
        expect(typeof p.id).toBe('string');
      });
    });
  });

  describe('getSortedPostSummaries', () => {
    it('投稿サマリーが日付順にソートされている', () => {
      const summaries = getSortedPostSummaries();
      expect(summaries.length).toBeGreaterThan(0);

      for (let i = 0; i < summaries.length - 1; i++) {
        expect(summaries[i].date >= summaries[i + 1].date).toBeTruthy();
      }
    });

    it('各サマリーに必要なプロパティが含まれる', () => {
      const summaries = getSortedPostSummaries();
      summaries.forEach((summary: PostSummary) => {
        expect(summary.id).toBeDefined();
        expect(summary.title).toBeDefined();
        expect(summary.date).toBeDefined();
        expect(summary.author).toBeDefined();
      });
    });
  });

  describe('getPostSummary', () => {
    it('特定の投稿のサマリーを取得できる', () => {
      const postIds = getAllPostIds();
      if (postIds.length > 0) {
        const summary = getPostSummary(postIds[0].id);
        expect(summary.id).toBe(postIds[0].id);
        expect(summary.title).toBeDefined();
        expect(summary.date).toBeDefined();
        expect(summary.author).toBeDefined();
      }
    });
  });

  describe('getPost', () => {
    it('特定の投稿の詳細を取得できる', async () => {
      const postIds = getAllPostIds();
      if (postIds.length > 0) {
        const post: Post = await getPost(postIds[0].id);
        expect(post.id).toBe(postIds[0].id);
        expect(post.title).toBeDefined();
        expect(post.date).toBeDefined();
        expect(post.author).toBeDefined();
        expect(post.contentHtml).toBeDefined();
        expect(typeof post.contentHtml).toBe('string');
      }
    });

    it('マークダウンがHTMLに変換される', async () => {
      const postIds = getAllPostIds();
      if (postIds.length > 0) {
        const post = await getPost(postIds[0].id);
        expect(post.contentHtml.length).toBeGreaterThan(0);
      }
    });
  });
});
