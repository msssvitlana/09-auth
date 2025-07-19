import { fetchNotes } from "../../../../../lib/api/clientApi";
import NotesClient from "./Notes.client";
import { Metadata } from 'next';

type FilteredNotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: FilteredNotesPageProps): Promise<Metadata> {
  const { slug } = await params; 
  const tag = slug[0] === "All" ? undefined : slug[0];

  return {
    title: `Нотатки за фільтром: ${tag}`,
    description: `Перегляд нотаток з фільтром "${tag}"`,
    openGraph: {
      title: `Нотатки за фільтром: ${tag}`,
      description: `Перегляд нотаток з фільтром "${tag}"`,
      url: `https://08-zustand-cyan.vercel.app/${slug}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  const data = await fetchNotes( "", 12, tag);
  console.log(params)
  return <NotesClient notesData={data} tag={tag} />;
}



  

 

