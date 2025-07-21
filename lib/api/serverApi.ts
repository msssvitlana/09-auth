// lib/api/serverApi.ts
import { cookies } from 'next/headers';
import nextServer from "./api";
import type { User } from '../../types/user';
import type { Note } from '../../types/note'

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export const logout = async (): Promise<void> => {
  const cookieStore = await cookies();
  await nextServer.post('/auth/logout', null, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};



const NOTES_PER_PAGE = 12;
export const serverFetchNotes = async (
  query: string,
  page: number,
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
  const cookieHeader = cookies().toString(); 
  const params: Record<string, string | number> = {
    page,
    perPage: NOTES_PER_PAGE,
    ...(query.trim() && { search: query.trim() }),
    ...(tag && tag !== "All" && { tag }),
  };

  const res = await nextServer.get("/notes", {
    params,
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};

export const serverFetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies()
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
  return data
}