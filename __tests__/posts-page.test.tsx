import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PostPage, { generateStaticParams, generateMetadata } from '../app/posts/[id]/page';

vi.mock('../lib/posts', () => ({
  getAllPostIds: vi.fn(() => [
    { id: 'test-post' },
  ]),
  getPost: vi.fn(async (id: string) => ({
    id,
    title: 'テスト投稿タイトル',
    date: '2025-11-11',
    author: 'Atis',
    contentHtml: '<p>これはテスト投稿の本文です。</p>',
  })),
}));

describe('Post page', () => {
  it('generateStaticParamsが投稿IDを返す', async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([{ id: 'test-post' }]);
  });

  it('generateMetadataが正しいメタデータを返す', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ id: 'test-post' }) });
    expect(metadata.title).toBe('テスト投稿タイトル - Nyantech');
    expect(metadata.description).toBe('テスト投稿タイトル');
  });

  it('投稿タイトルが表示される', async () => {
    const PostComponent = await PostPage({ params: Promise.resolve({ id: 'test-post' }) });
    render(PostComponent);
    expect(screen.getByText('テスト投稿タイトル')).toBeInTheDocument();
  });

  it('投稿本文が表示される', async () => {
    const PostComponent = await PostPage({ params: Promise.resolve({ id: 'test-post' }) });
    render(PostComponent);
    expect(screen.getByText('これはテスト投稿の本文です。')).toBeInTheDocument();
  });

  it('著者名が表示される', async () => {
    const PostComponent = await PostPage({ params: Promise.resolve({ id: 'test-post' }) });
    render(PostComponent);
    const authorElements = screen.getAllByText('Atis');
    expect(authorElements.length).toBeGreaterThan(0);
  });
});
