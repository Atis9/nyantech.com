import '../styles/globals.scss';
import '@primer/css/index.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nyantech',
  description: 'Nyantech',
  openGraph: {
    title: 'Nyantech',
  },
  twitter: {
    card: 'summary_large_image',
  },
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
    <html lang="ja" data-color-mode="auto" data-light-theme="light" data-dark-theme="dark">
      <body>{children}</body>
    </html>
  );
}
