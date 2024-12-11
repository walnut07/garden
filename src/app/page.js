import Navbar from '@/components/Navbar';
import { getAllNotes } from '../utils/notes';
import Link from 'next/link';

export default async function Home() {
  const notes = getAllNotes();
  const recentNotes = notes.slice(0, 3).map(note => ({
    title: note.title || '',
    slug: note.slug,
    excerpt: note.excerpt,
  }));

  const tags = Array.from(new Set(notes.flatMap(note => note.tags)));

  return (
    <>
      {/* Header Section */}
      <header
        style={{
          backgroundImage: `url(/cover.png)`,
          padding: '2rem',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1>Welcome to Kurumi&apos;s Garden</h1>
        </div>
        <p>A cozy place to grow and share ideas🌱<br/>
          This is 80% reflection of what mtkrm wonders and thinks about from trivial thoughts to life-changing moments. 
          It&apos;s a &apos;garden&apos; as I (at least) try to take care of them on a regular basis.
          You might know me from:</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <img
            src="/path-to-icon1.png"
            className="tooltip"
            alt="Community 1"
            title="Community 1 Description"
            style={{ width: '32px', margin: '0 8px' }}
          />
          <img
            src="/path-to-icon2.png"
            className="tooltip"
            alt="Community 2"
            title="Community 2 Description"
            style={{ width: '32px', margin: '0 8px' }}
          />
        </div>
      </header>

      <Navbar />

      <main>
        {/* Self-Introduction Section */}
        <section className="intro-section">
          <h2>whoami</h2>
          <p>
            I go by Kurumi Muto/武藤胡桃 in the real world, while I&apos;m also known as mtkrm and walnut07 in the cyber space.
            My personal enthusiasm lies in Web, microservices, privacy, and feminism (I know it&apos;s scattered!). 
            I also find myself enjoying finger-drumming with hip-hop music, although I haven&apos;t performed publicly or created content yet.
            One of my routines is to take notes of whatever I learn or search, and the page {
            <Link href="/notes" className="intro-link">
              notes
            </Link>
            } gives you a glimpse of what my brain consumes.
            For my brief history, check out my{' '} <Link href="/resume" className="intro-link"> resume </Link>
          </p>
        </section>

        {/* Recent Notes Section */}
        <section className="recent-notes">
          <h2>Recent Notes</h2>
          <p>
            A reflection of my Logseq notes.
          </p>
          <ul className="recent-notes-list">
            {recentNotes.map(note => (
              <li key={note.slug} className="recent-note-item">
                <Link href={`/notes/${note.slug}`} className="recent-note-link">
                  <h3>{note.title}</h3>
                  <p>{note.excerpt}...</p>
                </Link>
              </li>
            ))}
          </ul>
          <p>
            For all the notes I&apos;ve taken, visit the{' '}
            <Link href="/notes" className="recent-notes-link">
              all notes page
            </Link>
            .
          </p>
        </section>

        {/* Tags Section */}
        <section className="tags-section">
          <h2>Tags</h2>
          <ul className="tags-list">
          {tags
            .filter(tag => tag && tag.length > 0)
            .map(tag => (
              <li key={tag} className="tag-item">
                <Link href={`/notes?tag=${tag}`} className="tag-link" key={tag}>
                  #{tag}
                </Link>
              </li>
            ))
          }
          </ul>
        </section>
      </main>
    </>
  );
}
