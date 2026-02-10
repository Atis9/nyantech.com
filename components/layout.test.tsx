import { render, screen } from '@testing-library/react';
import Layout, { name } from './layout';
import { profile } from './profile';

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

    expect(screen.getByText(profile.bio)).toBeInTheDocument();
    profile.links.forEach(({ url }) => {
      expect(screen.getByText(url)).toBeInTheDocument();
    });
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
