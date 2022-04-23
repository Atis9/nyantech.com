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

      <section>
        <h1>Blog</h1>
        <ul className='ActionList'>
          {allPostSummaries.map(({ id, date, title }) => (
            <Link href={`/posts/${id}`} passHref key={id}>
              <li className='ActionList-item p-2'>
                <div className='ActionList-content'>
                  <div className='ActionList-item-label'>
                    <span className='color-fg-muted'>
                      <Date dateString={date} />
                    </span>
                    <span> </span>
                    <strong>{title}</strong>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
