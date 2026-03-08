import Link from 'next/link';
import Date from '../components/date';
import { getSortedPostSummaries } from '../lib/posts';
import Layout from '../components/site-layout';

export default async function Home() {
  const allPostSummaries = getSortedPostSummaries();

  return (
    <Layout home={true}>
      <h1>Blog</h1>
      <div className='border rounded-2 my-3'>
        <div className='color-bg-subtle d-flex px-3 py-2 border-bottom rounded-top-2 f6 color-fg-muted'>
          <div className='flex-1'>Title</div>
          <div className='flex-1 d-flex'>
            <div className='flex-1'>Author</div>
            <div className='flex-1'>Date</div>
          </div>
        </div>
        {allPostSummaries.map(({ id, date, title, author }) => (
          <div className='d-flex px-3 py-2 border-bottom' key={id}>
            <div className='flex-1'>
              <Link href={`/posts/${id}`}>
                <strong>{title}</strong>
              </Link>
            </div>
            <div className='flex-1 d-flex'>
              <div className='flex-1'>
                <strong>{author}</strong>
              </div>
              <div className='color-fg-muted flex-1'>
                <Date dateString={date} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
