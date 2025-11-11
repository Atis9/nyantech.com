import Layout from '../../../components/layout';
import { getAllPostIds, getPost, Post } from '../../../lib/posts';
import Date from '../../../components/date';
import 'highlight.js/styles/github.css';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const postIds = getAllPostIds();
  return postIds.map((postId) => ({
    id: postId.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const post = await getPost(id);
  return {
    title: `${post.title} - Nyantech`,
    description: post.title,
  };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const post = await getPost(id);

  return (
    <Layout home={false}>
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
    </Layout>
  );
}
