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
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <h1>Blog</h1>
      <div className='Box my-3'>
        <div className='Box-header'>
          <div>Title</div>
          <div>Author</div>
          <div>Date</div>
        </div>
        {allPostSummaries.map(({ id, date, title, author }) => (
          <div className='Box-row Box-row--hover-gray' key={id}>
            <div className='Box-row-link'>
              <Link href={`/posts/${id}`} passHref>
                <a><strong>{title}</strong></a>
              </Link>
            </div>
            <strong>{author}</strong>
            <div className='color-fg-muted'>
              <Date dateString={date} />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
