import { getAllNotes } from '../../utils/serverNotes';
import NotesComponent from './NotesComponent';

export const metadata = {
  title: 'Notes',
  description: 'Browse notes by date or tag.',
};

export default function NotesPage() {
  const notes = getAllNotes();
  return <NotesComponent notes={notes} />;
}
