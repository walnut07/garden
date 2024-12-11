import Navbar from '@/components/Navbar';
import { getNoteBySlug, getAllNoteSlugs } from '../../../utils/notes';
import '@/styles/individual-note.css'

export default async function NotePage({ params }) {
  const note = getNoteBySlug(params.slug);

  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem' }} className='individual-note-container'>
        <h1>{note.title}</h1>
        <p><em>{note.date}</em></p>
        <article dangerouslySetInnerHTML={{ __html: note.content }} />
      </div>
    </>
  );
}
