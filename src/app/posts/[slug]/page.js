import { getPostBySlug, getAllPostSlugs } from '../../../utils/posts';

export default async function PostPage({ params }) {
  const post = getPostBySlug(params.slug);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p><em>{post.date}</em></p>
      <article dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
