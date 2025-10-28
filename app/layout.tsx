import { ReactNode } from 'react';
import '@primer/css/index.scss';
import '../styles/globals.scss';
import 'highlight.js/styles/github.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Nyantech',
  description: 'Nyantech',
  icons: {
    icon: '/nyantech_logo.svg',
  },
  openGraph: {
    title: 'Nyantech',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const name: string = 'Atis';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className='container'>
          <header className='Header'>
            <div className='container-xl'>
              <div className='Header-item'>
                <Link href='/' className='Header-link f4 d-flex flex-items-center'>
                  <span className='mr-2'>
                    <Image
                      priority
                      src='/nyantech_logo.svg'
                      height={32}
                      width={32}
                      alt={name}
                    />
                  </span>
                  <span>Nyantech</span>
                </Link>
              </div>
            </div>
          </header>

          <div className='container-md p-4'>
            <div className='d-flex flex-column flex-md-row flex-items-center flex-md-items-center border rounded-3 p-2 mb-2'>
              <div className='d-flex flex-items-center flex-md-items-start'>
                <Image
                  priority
                  src='/images/Atis.png'
                  height={128}
                  width={128}
                  alt={name}
                />
              </div>
              <div className='col-12 col-md-10 d-flex flex-column flex-justify-center flex-items-center flex-md-items-start pl-md-4'>
                <h1 className='text-normal lh-condensed'>{name}</h1>
                <p className='h4 text-normal mb-2'>
                  Code を書き Chord を鳴らし Cord を取り回す人
                </p>
                <a className='text-small' href='https://github.com/Atis9'>
                  https://github.com/Atis9
                </a>
                <a className='text-small' href='https://x.com/AtiS'>
                  https://x.com/AtiS
                </a>
                <a className='text-small' rel="me" href="https://atis.social/@atis">
                  https://atis.social/@atis
                </a>
              </div>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
