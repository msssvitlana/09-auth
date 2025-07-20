export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserData = {
  email: string
  password: string
  name?: string
}
