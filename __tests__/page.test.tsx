import { render, screen } from '@testing-library/react';
import Home from '../app/page';

jest.mock('../lib/posts', () => ({
  getSortedPostSummaries: jest.fn(() => [
    {
      id: 'test-post-1',
      title: 'テスト投稿1',
      date: '2025-11-11',
      author: 'Atis',
    },
    {
      id: 'test-post-2',
      title: 'テスト投稿2',
      date: '2025-11-10',
      author: 'Atis',
    },
  ]),
}));

describe('Home page', () => {
  it('ブログタイトルが表示される', async () => {
    const HomeComponent = await Home();
    render(HomeComponent);
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('投稿一覧が表示される', async () => {
    const HomeComponent = await Home();
    render(HomeComponent);
    expect(screen.getByText('テスト投稿1')).toBeInTheDocument();
    expect(screen.getByText('テスト投稿2')).toBeInTheDocument();
  });

  it('投稿のテーブルヘッダーが表示される', async () => {
    const HomeComponent = await Home();
    render(HomeComponent);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });
});
