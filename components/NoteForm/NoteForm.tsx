'use client';

import css from './NoteForm.module.css';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createNote } from '../../lib/api';
import type { Note, NewNoteData, NoteTag } from '../../types/note';
import { useNoteDraftStore } from '../../lib/store/noteStore'
import { useQueryClient } from '@tanstack/react-query';

interface NoteFormProps {
  tags: string[];
  onSuccess?: () => void;
  note?: Note;
  action?: (formData: FormData) => Promise<void>;
}

const NoteForm = ({ tags, onSuccess }: NoteFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['Notes'] });
      onSuccess?.();
      router.back();
      router.refresh(); 
    },
    onError: (error) => {
      console.error('Error creating note:', error);
      alert('Failed to create note');
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  
    const data: NewNoteData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };
  
    mutate(data);
  };


  return (
    <form className={css.form} onSubmit={handleSubmit}>
   <label className={css.formGroup}>
        Title
        <input
          className={css.input}
          type="text"
          name="title"
          value={draft.title}
          onChange={handleChange}
          required
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          value={draft.content}
          onChange={handleChange}
        />
      </label>

      <label className={css.formGroup}>
        Tag
        <select
          className={css.select}
          name="tag" value={draft.tag} onChange={handleChange} required>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>
      <div className={css.actions}>
  <button type="submit" className={css.submitButton}>
    Create
  </button>
  <button
    type="button"
    className={css.cancelButton}
    onClick={() => router.push('/notes/filter/all')}
  >
    Cancel
  </button>
</div>

    </form>
  );
};

export default NoteForm;
