'use client';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { getMe, updateMe } from '../../../../lib/api/clientApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "../../../../lib/store/authStore";

const EditProfile = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        if (user) {
          setUsername(user.username || '');
          setEmail(user.email);
          setAvatarUrl(user.avatar || '');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await updateMe({ username });
    if (data) {
      setUser(data);
      router.push('/profile');
    }
  };

  const handleCancel = () => router.back();

  if (loading) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {avatarUrl && (
          <div className={css.avatarWrapper}>
            <Image
              src={avatarUrl}
              alt="User avatar"
              width={100}
              height={100}
              className={css.avatar}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
            />
          </div>

          <div className={css.emailWrapper}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              readOnly
              className={`${css.input} ${css.readonly}`}
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
