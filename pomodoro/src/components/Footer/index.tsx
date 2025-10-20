import { RouterLink } from '../RouterLink';
import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro'>
        Entenda como funciona o Pomodoro 🍅
      </RouterLink>
    </footer>
  );
}
