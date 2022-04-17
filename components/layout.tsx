import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

const name: string = 'Atis';
export const siteTitle: string = 'Atis';

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
          content='Learn how to build a personal website using Next.js'
        />
        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>

      <div className='container'>
        <header className='Header'>
          <div className='container-xl'>
            <div className='d-flex flex-column flex-md-row flex-items-center flex-md-items-center'>
              <div className='col-2 d-flex flex-items-center flex-items-center flex-md-items-start'>
                <Link href='/' passHref>
                  <Image
                    priority
                    src='/images/profile.png'
                    height={128}
                    width={128}
                    alt={name}
                  />
                </Link>
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
          </div>
        </header>
        <div className='container-md'>
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
