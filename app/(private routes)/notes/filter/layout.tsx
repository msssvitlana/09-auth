import React from "react";
import css from './layout.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NoteHub',
    description: 'Make your notes for everyday',
    openGraph: {
        title: 'NoteHub',
        description: 'Make your notes for everyday',
        url: 'https://08-zustand-cyan.vercel.app/',
        images: [
            {
              url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
              width: 1200,
              height: 630,
            },
          ],
    }
}

interface NotesListProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
};

export default function NotesLayout({ children, sidebar }: NotesListProps) {
    return (
        <div className={css.container}>
            <aside className={css.sidebar}>{sidebar}</aside>
            <main className={css.notesWrapper}>{children}</main>
        </div>
    );
}