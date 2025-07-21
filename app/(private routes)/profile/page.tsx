// app/(private-routes)/profile/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import css from './ProfilePage.module.css';
import { getServerMe } from '../../../lib/api/serverApi';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'User Profile | NoteHub',
  description: 'Your personal profile page',
};

const Profile = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar|| '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
