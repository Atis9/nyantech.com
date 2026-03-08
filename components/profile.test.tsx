import { render, screen } from '@testing-library/react';
import ProfileCard, { profile } from './profile';

describe('ProfileCard', () => {
  it('名前が表示される', () => {
    render(<ProfileCard />);
    expect(screen.getByText(profile.name)).toBeInTheDocument();
  });

  it('自己紹介が表示される', () => {
    render(<ProfileCard />);
    expect(screen.getByText(profile.bio)).toBeInTheDocument();
  });

  it('すべてのリンクが表示される', () => {
    render(<ProfileCard />);
    profile.links.forEach(({ url }) => {
      const link = screen.getByText(url);
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', url);
    });
  });

  it('Mastodonリンクにrel="me"が設定される', () => {
    render(<ProfileCard />);
    const mastodonLink = screen.getByText('https://atis.social/@atis');
    expect(mastodonLink.closest('a')).toHaveAttribute('rel', 'me');
  });

  it('アバター画像が表示される', () => {
    render(<ProfileCard />);
    expect(screen.getByAltText(profile.name)).toBeInTheDocument();
  });
});
