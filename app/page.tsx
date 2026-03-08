import { getSortedPostSummaries } from '../lib/posts';
import Layout from '../components/site-layout';
import PostList from '../components/post-list';

export default async function Home() {
  const allPostSummaries = getSortedPostSummaries();

  return (
    <Layout home={true}>
      <PostList posts={allPostSummaries} />
    </Layout>
  );
}
