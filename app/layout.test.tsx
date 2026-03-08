import { metadata } from './layout';

describe('RootLayout', () => {
  it('メタデータのタイトルが設定されている', () => {
    expect(metadata.title).toBe('Nyantech');
  });

  it('メタデータのdescriptionが設定されている', () => {
    expect(metadata.description).toBe('Nyantech');
  });

  it('OGPが設定されている', () => {
    expect(metadata.openGraph).toEqual({ title: 'Nyantech' });
  });

  it('Twitterカードが設定されている', () => {
    expect(metadata.twitter).toEqual({ card: 'summary_large_image' });
  });

  it('ファビコンが設定されている', () => {
    expect(metadata.icons).toEqual({ icon: '/nyantech_logo.svg' });
  });
});
