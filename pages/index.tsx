import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostSummaries, PostSummary } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostSummaries = getSortedPostSummaries();
  return {
    props: {
      allPostSummaries,
    },
  };
}

export default function Home({
  allPostSummaries,
}: {
  allPostSummaries: PostSummary[];
}) {
  return (
    (<Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>Blog</h1>
      <div className='Box my-3'>
        <div className='Box-header d-flex'>
          <div className='flex-1 px-2'>Title</div>
          <div className='flex-1 d-flex'>
            <div className='flex-1 px-2'>Author</div>
            <div className='flex-1 px-2'>Date</div>
          </div>
        </div>
        {allPostSummaries.map(({ id, date, title, author }) => (
          <div className='Box-row Box-row--hover-gray d-flex' key={id}>
            <div className='Box-row-link flex-1 px-2'>
              <Link href={`/posts/${id}`} passHref>
                <strong>{title}</strong>
              </Link>
            </div>
            <div className='flex-1 d-flex'>
              <div className='flex-1 px-2'>
                <strong>{author}</strong>
              </div>
              <div className='color-fg-muted flex-1 px-2'>
                <Date dateString={date} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>)
  );
}
