import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

const name: string = 'Atis';
export const siteTitle: string = 'Nyantech';

export default function Layout({
  children,
  home,
}: {
  children: ReactNode;
  home: boolean;
}) {
  return (
    <div>
      <Head>
        <link rel='icon' href='favicon.ico' />
        <meta
          name='description'
          content='Nyantech'
        />
        <meta
          property='og:image'
          content='/images/logo.png'
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>

      <div className='container'>
        <header className='Header'>
          <div className='container-xl'>
            <div className='Header-item'>
              <Link href='/' passHref>
                <a className='Header-link f4 d-flex flex-items-center'>
                  <span className='mr-2'>
                    <Image
                      priority
                      src='/images/logo.png'
                      height={32}
                      width={32}
                      alt={name}
                    />
                  </span>
                  <span>Nyantech</span>
                </a>
              </Link>
            </div>
          </div>
        </header>

        <div className='container-md p-4'>
          <div className='d-flex flex-column flex-md-row flex-items-center flex-md-items-center border rounded-3 p-2 mb-2'>
            <div className='col-2 d-flex flex-items-center flex-items-center flex-md-items-start'>
              <Image
                priority
                src='/images/profile.png'
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
              <a className='text-small' href='#url'>
                https://github.com/Atis9
              </a>
            </div>
          </div>

          <main>{children}</main>
          {!home && (
            <Link href='/' passHref>
              <button className='btn btn-outline'>
                <span>← Back to home</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
