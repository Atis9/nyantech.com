import { render, screen } from '@testing-library/react';
import SiteLayout, { name } from './site-layout';

describe('SiteLayout component', () => {
  it('子要素をレンダリングする', () => {
    render(
      <SiteLayout home={true}>
        <div>テストコンテンツ</div>
      </SiteLayout>
    );

    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
  });

  it('ヘッダーにサイト名が表示される', () => {
    render(
      <SiteLayout home={true}>
        <div>テスト</div>
      </SiteLayout>
    );

    expect(screen.getByText('Nyantech')).toBeInTheDocument();
  });

  it('ロゴ画像が表示される', () => {
    render(
      <SiteLayout home={true}>
        <div>テスト</div>
      </SiteLayout>
    );

    expect(screen.getAllByAltText(name).length).toBeGreaterThan(0);
  });

  it('ホームページモードでは戻るボタンが表示されない', () => {
    render(
      <SiteLayout home={true}>
        <div>テスト</div>
      </SiteLayout>
    );

    expect(screen.queryByText('← Back to home')).not.toBeInTheDocument();
  });

  it('投稿ページモードで戻るボタンが表示される', () => {
    render(
      <SiteLayout home={false}>
        <div>テスト</div>
      </SiteLayout>
    );

    expect(screen.getByText('← Back to home')).toBeInTheDocument();
  });
});
