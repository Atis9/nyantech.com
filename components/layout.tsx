import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import ProfileCard, { profile } from './profile';

export const name = profile.name;

interface LayoutProps {
  children: ReactNode;
  home: boolean;
}

export default function Layout({ children, home }: LayoutProps) {
  return (
    <div>
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
