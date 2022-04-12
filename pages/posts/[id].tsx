import Layout from '../../components/layout'
import { getAllPostIds, getPost, Post } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function ShowPost({ post }: { post: Post }) {
  return (
    <Layout home={false}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  return {
    props: {
      post
    }
  }
}
