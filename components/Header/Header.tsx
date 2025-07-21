import css from './Header.module.css';
import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
const Header = () => {
  return (
    <header className={css.header}>
      <Link href='/' aria-label='Home'>
        NoteHUB
      </Link>
      <nav aria-label='Main Navigation'>
        <ul className={css.navigation}>
          <li className={css.navigationLink}><TagsMenu /></li> 
          <li className={css.menuItem}>
            <Link className={css.navigationLink} href='/'>Home</Link>
          </li>
          <li className={css.menuItem}>
            <Link className={css.navigationLink} href='/about'>About</Link>
          </li>
          
             <AuthNavigation  />  
         

        </ul>
      </nav>
    </header>
  );
};

export default Header;
