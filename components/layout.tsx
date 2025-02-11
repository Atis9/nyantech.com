import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export const name: string = 'Atis';
export const siteTitle: string = 'Nyantech';

export default function Layout({
  children,
  home,
}: {
  children: ReactNode;
  home: boolean;
}) {
  return (
    (<div>
      <Head>
        <link rel='icon' href='/nyantech_logo.svg' type='image/svg+xml' />
        <meta name='description' content='Nyantech' />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <div className='container'>
        <header className='Header'>
          <div className='container-xl'>
            <div className='Header-item'>
              <Link href='/' passHref className='Header-link f4 d-flex flex-items-center'>

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
            <div className='col-2 d-flex flex-items-center flex-items-center flex-md-items-start'>
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
              <a className='text-small' rel="me" href="https://atis.social/@atis">
                https://atis.social/@atis
              </a>
            </div>
          </div>

          <main>{children}</main>
          {!home && (
            <Link href='/' passHref legacyBehavior>
              <button className='btn btn-outline'>
                <span>← Back to home</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>)
  );
}
