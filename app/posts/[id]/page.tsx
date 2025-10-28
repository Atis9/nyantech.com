import { getAllPostIds, getPost } from '../../../lib/posts';
import { siteTitle } from '../../../components/layout';
import Date from '../../../components/date';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    id: path.params.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  return {
    title: `${post.title} - ${siteTitle}`,
    description: post.title,
    openGraph: {
      description: post.title,
    },
  };
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <div className='Box my-3'>
          <div className='Box-header d-flex flex-column flex-md-row flex-items-center flex-md-items-center'>
            <Image
              priority
              src={`/images/${post.author}.png`}
              height={48}
              width={48}
              alt={post.author}
            />
            <div className='col-12 col-md-10 d-flex flex-column flex-justify-center flex-items-center flex-md-items-start pl-md-3'>
              <div className='Box-title'>{post.author}</div>
              <div className='color-fg-muted'><Date dateString={post.date} /></div>
            </div>
          </div>
          <div
            className='markdown-body Box-body'
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </article>
      <Link href='/'>
        <button className='btn btn-outline'>
          <span>← Back to home</span>
        </button>
      </Link>
    </>
  );
}
