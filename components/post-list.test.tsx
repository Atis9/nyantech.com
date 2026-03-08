import { render, screen, fireEvent } from '@testing-library/react';
import PostList from './post-list';
import { PostSummary } from '../lib/posts';

function createPosts(count: number): PostSummary[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i + 1}`,
    title: `テスト投稿${i + 1}`,
    date: `2025-01-${String(count - i).padStart(2, '0')}`,
    author: 'Atis',
  }));
}

describe('PostList', () => {
  it('グループヘッダーにBlogが表示される', () => {
    render(<PostList posts={createPosts(1)} />);
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('投稿がカード形式で表示される', () => {
    render(<PostList posts={createPosts(2)} />);
    expect(screen.getByText('テスト投稿1')).toBeInTheDocument();
    expect(screen.getByText('テスト投稿2')).toBeInTheDocument();
  });

  it('各カードに日付と著者が表示される', () => {
    render(<PostList posts={createPosts(1)} />);
    expect(screen.getByText('Atis')).toBeInTheDocument();
    expect(screen.getByText('2025-01-01 00:00')).toBeInTheDocument();
  });

  it('6件以下ではページネーションが表示されない', () => {
    render(<PostList posts={createPosts(6)} />);
    expect(screen.queryByText('← Prev')).not.toBeInTheDocument();
  });

  it('7件以上でページネーションが表示される', () => {
    render(<PostList posts={createPosts(7)} />);
    expect(screen.getByText('← Prev')).toBeInTheDocument();
    expect(screen.getByText('Next →')).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  it('最初のページではPrevボタンが無効', () => {
    render(<PostList posts={createPosts(7)} />);
    expect(screen.getByText('← Prev')).toBeDisabled();
    expect(screen.getByText('Next →')).not.toBeDisabled();
  });

  it('Nextボタンで次のページに遷移する', () => {
    render(<PostList posts={createPosts(7)} />);
    fireEvent.click(screen.getByText('Next →'));

    expect(screen.getByText('2 / 2')).toBeInTheDocument();
    expect(screen.getByText('テスト投稿7')).toBeInTheDocument();
    expect(screen.queryByText('テスト投稿1')).not.toBeInTheDocument();
  });

  it('最後のページではNextボタンが無効', () => {
    render(<PostList posts={createPosts(7)} />);
    fireEvent.click(screen.getByText('Next →'));

    expect(screen.getByText('Next →')).toBeDisabled();
    expect(screen.getByText('← Prev')).not.toBeDisabled();
  });

  it('Prevボタンで前のページに戻る', () => {
    render(<PostList posts={createPosts(7)} />);
    fireEvent.click(screen.getByText('Next →'));
    fireEvent.click(screen.getByText('← Prev'));

    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    expect(screen.getByText('テスト投稿1')).toBeInTheDocument();
  });

  it('投稿が0件のとき空のリストが表示される', () => {
    const { container } = render(<PostList posts={[]} />);
    expect(container.querySelectorAll('a')).toHaveLength(0);
  });
});
