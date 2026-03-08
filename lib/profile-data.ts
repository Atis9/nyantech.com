export interface ProfileLink {
  url: string;
  rel?: string;
}

export interface Profile {
  name: string;
  bio: string;
  links: ProfileLink[];
}

export const profile: Profile = {
  name: 'Atis',
  bio: 'Code を書き Chord を鳴らし Cord を取り回す人',
  links: [
    { url: 'https://github.com/Atis9' },
    { url: 'https://x.com/AtiS' },
    { url: 'https://atis.social/@atis', rel: 'me' },
  ],
};
