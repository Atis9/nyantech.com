import { render, screen } from '@testing-library/react';
import Layout, { name } from './layout';

describe('Layout component', () => {
  it('ホームページモードでレンダリングされる', () => {
    render(
      <Layout home={true}>
        <div>テストコンテンツ</div>
      </Layout>
    );

    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    expect(screen.getByText('Nyantech')).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('ホームページモードでは戻るボタンが表示されない', () => {
    render(
      <Layout home={true}>
        <div>テストコンテンツ</div>
      </Layout>
    );

    expect(screen.queryByText('← Back to home')).not.toBeInTheDocument();
  });

  it('投稿ページモードで戻るボタンが表示される', () => {
    render(
      <Layout home={false}>
        <div>テストコンテンツ</div>
      </Layout>
    );

    expect(screen.getByText('← Back to home')).toBeInTheDocument();
  });

  it('プロフィール情報が表示される', () => {
    render(
      <Layout home={true}>
        <div>テストコンテンツ</div>
      </Layout>
    );

    expect(screen.getByText('Code を書き Chord を鳴らし Cord を取り回す人')).toBeInTheDocument();
    expect(screen.getByText('https://github.com/Atis9')).toBeInTheDocument();
    expect(screen.getByText('https://x.com/AtiS')).toBeInTheDocument();
  });

  it('ロゴ画像が表示される', () => {
    render(
      <Layout home={true}>
        <div>テストコンテンツ</div>
      </Layout>
    );

    const logoImages = screen.getAllByAltText(name);
    expect(logoImages.length).toBeGreaterThan(0);
  });
});
