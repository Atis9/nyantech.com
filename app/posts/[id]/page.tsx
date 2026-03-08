import Layout from '../../../components/site-layout';
import { getAllPostIds, getPost } from '../../../lib/posts';
import Date from '../../../components/date';
import 'highlight.js/styles/github.css';
import Image from 'next/image';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllPostIds();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  return {
    title: `${post.title} - Nyantech`,
    description: post.title,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <Layout home={false}>
      <article className='border rounded-2 my-3'>
        <div className='color-bg-subtle px-3 py-2 border-bottom rounded-top-2'>
          <h1 className='f3 m-0'>{post.title}</h1>
        </div>
        <div>
          <div className='d-flex flex-column flex-md-row flex-items-center p-3 border-bottom'>
            <Image
              className='avatar circle'
              priority
              src={`/images/${post.author}.png`}
              height={48}
              width={48}
              alt={post.author}
            />
            <div className='col-12 col-md-10 d-flex flex-column flex-justify-center flex-items-center flex-md-items-start pl-md-3'>
              <div className='color-fg-muted f6'><Date dateString={post.date} /></div>
              <div className='f5 text-bold'>{post.author}</div>
            </div>
          </div>
          {/* Content is sanitized in parseMarkdownToHtml() */}
          <div
            className='markdown-body p-3'
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </article>
    </Layout>
  );
}
