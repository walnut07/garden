import { Suspense } from 'react';
import NotesComponent from './NotesComponent';

export default function NotesPage({ notes }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotesComponent notes={notes} />
    </Suspense>
  );
}
