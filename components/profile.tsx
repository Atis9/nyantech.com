import Image from 'next/image';
import { profile } from './profile-data';

export { profile } from './profile-data';

export default function ProfileCard() {
  return (
    <div className='d-flex flex-column flex-md-row flex-items-center flex-md-items-center border rounded-3 p-2 mb-2'>
      <div className='d-flex flex-items-center flex-md-items-start'>
        <Image
          priority
          src='/images/Atis.png'
          height={128}
          width={128}
          alt={profile.name}
        />
      </div>
      <div className='col-12 col-md-10 d-flex flex-column flex-justify-center flex-items-center flex-md-items-start pl-md-4'>
        <h1 className='text-normal lh-condensed'>{profile.name}</h1>
        <p className='h4 text-normal mb-2'>{profile.bio}</p>
        {profile.links.map(({ url, rel }) => (
          <a key={url} className='text-small' href={url} rel={rel}>
            {url}
          </a>
        ))}
      </div>
    </div>
  );
}
