import type { User } from '../../types/user';
import { type Note, NewNoteData } from "../../types/note";
import nextServer from "./api";

const NOTES_PER_PAGE = 12;

export type NoteListResponse = {
  notes: Note[];
  totalPages: number;
};

export const fetchNotes = async (
  query: string,
  page: number,
  tag?: string
): Promise<NoteListResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage: NOTES_PER_PAGE,
    ...(query.trim() && { search: query.trim() }),
    ...(tag && tag !== 'All' && { tag }),
  };

  const res = await nextServer.get('/notes', { params });
  return res.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await nextServer.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (note: NewNoteData): Promise<Note> => {
  const res = await nextServer.post('/notes', note);
  return res.data;
};

export const removeNote = async (id: number): Promise<Note> => {
  const res = await nextServer.delete(`/notes/${id}`);
  return res.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post('/auth/login', data);
  return res.data;
};
export async function checkSession(): Promise<boolean> {
  try {
    await nextServer.get("/auth/session");
    return true;
  } catch (error) {
    
    throw error;
  }
}

export const getMe = async () => {
  const res = await nextServer.get<User>("/users/me", { withCredentials: true })
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateUserRequest = {
  username?: string;
  avatar?: string;
 
};

export const updateMe = async (data: UpdateUserRequest) => {
  const res = await nextServer.patch('/users/me', data);
  return res.data;
};


