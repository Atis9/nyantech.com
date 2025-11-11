import '../styles/globals.scss';
import '@primer/css/index.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nyantech',
  description: 'A blog about technology and cats.',
  icons: {
    icon: '/nyantech_logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
