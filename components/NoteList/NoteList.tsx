'use client'
import { type Note } from "../../types/note";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeNote } from "../../lib/api";
import { useState } from "react";
import Link from 'next/link'

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const deleteNote = useMutation({
    mutationFn: (id: number) => removeNote(id),
    onMutate: (id: number) => {
      setDeletingId(id);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["Notes"] });
      const { default: iziToast } = await import("izitoast");
      iziToast.success({
        message: "Note deleted successfully",
        position: "topCenter",
      });
    },
    onError: async () => {
      const { default: iziToast } = await import("izitoast");
      iziToast.error({
        message: "Error deleting note, please try again",
        position: "topCenter",
      });
    },
    
    onSettled: () => {
      setDeletingId(null);
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
             
          <Link href={`/notes/${note.id}`} className={css.detailsLink}>
            View details
          </Link>
            <button
              onClick={() => deleteNote.mutate(note.id)}
              className={css.button}
              disabled={deletingId === note.id}
            >
              {deletingId === note.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
