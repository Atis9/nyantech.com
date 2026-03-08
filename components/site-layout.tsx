import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import ProfileCard, { profile } from './profile';

export const name = profile.name;

interface SiteLayoutProps {
  children: ReactNode;
  home: boolean;
}

export default function SiteLayout({ children, home }: SiteLayoutProps) {
  return (
    <div>
      <header className='Header'>
        <div className='container-xl'>
          <div className='Header-item mx-auto'>
            <Link href='/' className='Header-link f1 d-flex flex-items-center'>
              <span className='mr-2 d-flex'>
                <Image
                  priority
                  src='/nyantech_logo.svg'
                  height={32}
                  width={32}
                  alt={name}
                />
              </span>
              <h1 className='text-bold m-0'>Nyantech</h1>
            </Link>
          </div>
        </div>
      </header>

      <div className='container'>
        <div className='container-md p-4'>
          <ProfileCard />
          <main>{children}</main>
          {!home && (
            <Link href='/'>
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
