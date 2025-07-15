import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

interface NoteDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }:NoteDetailPageProps) {
  const { id } = await params
  const idNum = Number(id);

  const note = await fetchNoteById(idNum)
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `htps://notehub.com/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'article',
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title: `${note.title}`,
    //   description: note.content.slice(0, 3),
    //   images: ['https://ac.goit.global/fullstack/react/og-meta.jpg'],
    // },
  }
  
}

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { id } = await params;
  const idNum = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(idNum),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}