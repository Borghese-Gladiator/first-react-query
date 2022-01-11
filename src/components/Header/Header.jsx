import logo from './logo.svg';
import styles from './Header.module.css';

function Header() {
  return (    
    <div className={styles.App}>
      <header className={styles.App_header}>
        <img src={logo} className={styles.App_logo} alt="logo" />
        <a
          className={styles.App_link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          First React Query App
        </a>
      </header>
    </div>
  )
}

export default Header;