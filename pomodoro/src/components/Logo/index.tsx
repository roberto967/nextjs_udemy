import { TimerIcon } from 'lucide-react';
import styles from './styles.module.css';

// <a/> depois vai ser link do router

export function Logo() {
  return (
    <div className={styles.logo}>
      <a className={styles['logo-link']} href='#'>
        <TimerIcon />
        <span>Pomodoro Timer</span>
      </a>
    </div>
  );
}
