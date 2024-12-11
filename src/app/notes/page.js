import { Suspense } from 'react';
import NotesComponent from './NotesComponent';
import { getAllNotes } from '@/utils/serverNotes';

export default function NotesPage() {
  const notes = getAllNotes(); 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotesComponent notes={notes} />
    </Suspense>
  );
}
