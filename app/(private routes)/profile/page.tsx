// app/profile/page.tsx

import Link from 'next/link';
import css from './ProfilePage.module.css'
import { getServerMe } from '../../../lib/api/serverApi';



const Profile = async () => {
  const user = await getServerMe();

  return (
    <>
  <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>My Profile</h1>
	     <Link href='/profile/edit' className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     {/* <div className={css.avatarWrapper}>
      <img
        src="Avatar"
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div> */}
    <div className={css.profileInfo}>
      <p>
      Name: {user.userName}
      </p>
      <p>
      Email: {user.email}
      </p>
    </div>
  </div>
</main>

</>
  );
};

export default Profile;
