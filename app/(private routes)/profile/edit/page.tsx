'use client';
import css from './EditProfilePage.module.css';
import AvatarPicker from '../../../../components/AvatarPicker/AvatarPicker';
import { getMe, updateMe, uploadImage } from '../../../../lib/api/clientApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EditProfile = () => {
  const [userName, setUserName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? '');
      setPhotoUrl(user.photoUrl ?? '');
      setEmail(user.email ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newPhotoUrl = imageFile ? await uploadImage(imageFile) : photoUrl;
      await updateMe({ userName, photoUrl: newPhotoUrl });
      setPhotoUrl(newPhotoUrl);
      alert('Profile updated successfully');
      router.push('/profile'); // Після оновлення повертаємось на сторінку профілю
    } catch (error) {
      console.error('Oops, some error:', error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <AvatarPicker profilePhotoUrl={photoUrl} onChangePhoto={setImageFile} />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={userName}
              onChange={handleChange}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
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
