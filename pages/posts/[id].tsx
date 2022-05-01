import Layout, { siteTitle, name } from '../../components/layout';
import { getAllPostIds, getPost, Post } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import 'highlight.js/styles/github.css';
import Image from 'next/image';

export default function showPost({ post }: { post: Post }) {
  return (
    <Layout home={false}>
      <Head>
        <title>
          {post.title} - {siteTitle}
        </title>
        <meta name='og:description' content={post.title} />
      </Head>
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
              <div className='Box-title'>{name}</div>
              <div><Date dateString={post.date} /></div>
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

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return {
    props: {
      post,
    },
  };
}
