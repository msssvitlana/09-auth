'use client'
import css from './EditProfilePage.module.css'
import AvatarPicker from '../../../../components/AvatarPicker/AvatarPicker';
import { getMe, updateMe, uploadImage } from '../../../../lib/api/clientApi';
import { useState, useEffect } from 'react'


const EditProfile = () => {
  const [userName, setUserName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? '');
      setPhotoUrl(user.photoUrl ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

 const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newPhotoUrl = imageFile ? await uploadImage(imageFile) : '';
      await updateMe({ userName, photoUrl: newPhotoUrl });
    } catch (error) {
      console.error('Oops, some error:', error);
    }
  };
      return  (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>
      <AvatarPicker profilePhotoUrl={photoUrl} onChangePhoto={setImageFile} />
    {/* <Image  src="avatar"
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    /> */}

    <form className={css.profileInfo} onSubmit={handleSaveUser}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
       className={css.input}
       value={userName}
        onChange={handleChange}                 
        />
      </div>

      <p>Email: user_email@example.com</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>

    )
}

export default EditProfile;
