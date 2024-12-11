import { getAllPosts } from '../../utils/posts';

export default async function Posts() {
  const posts = getAllPosts();

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '20%', padding: '1rem', background: '#f4f4f4' }}>
        <h3>Categories</h3>
        {/* Example category filters */}
        <ul>
          <li><a href="?category=tech">Tech</a></li>
          <li><a href="?category=lifestyle">Lifestyle</a></li>
        </ul>
      </aside>

      {/* Posts List */}
      <main style={{ flex: 1, padding: '1rem' }}>
        <h1>All Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug} style={{ marginBottom: '1rem' }}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
