import css from './CreateNote.module.css';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import { Metadata } from 'next';
import type { NoteTag } from '../../../../types/note';

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
export const metadata: Metadata = {
  title: 'Create your note here',
  description:
    'Tap your new task in form below. Select the category.',
  openGraph: {
    title: 'Create your note here',
    description:
      'Tap your new task in form below. Select the category.',
    url: 'https://08-zustand-zeta.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub card',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
 <NoteForm tags={tags} />
      </div>
    </main>
  );
}
  