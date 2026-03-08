import Image from 'next/image';
import { profile } from '../lib/profile-data';

export { profile } from '../lib/profile-data';

export default function ProfileCard() {
  return (
    <div className='border rounded-2 mb-2'>
      <div className='color-bg-subtle px-3 py-2 border-bottom rounded-top-2'>
        <h2 className='f3 m-0'>Profile</h2>
      </div>
      <div className='d-flex flex-column flex-md-row flex-items-center p-3'>
        <div className='d-flex flex-items-center flex-md-items-start'>
          <Image
            className='avatar circle'
            priority
            src='/images/Atis.png'
            height={128}
            width={128}
            alt={profile.name}
          />
        </div>
        <div className='col-12 col-md-10 d-flex flex-column flex-justify-center flex-items-center flex-md-items-start pl-md-4'>
          <h3 className='f3 text-normal lh-condensed'>{profile.name}</h3>
          <p className='h4 text-normal mb-2'>{profile.bio}</p>
          {profile.links.map(({ url, rel }) => (
            <a key={url} className='text-small' href={url} rel={rel}>
              {url}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
