import { HistoryIcon, HomeIcon, Settings2Icon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';

// <a/> depois vai ser link do router

const menuItems = [
  { href: '#', icon: HomeIcon, label: 'Home' },
  { href: '#', icon: HistoryIcon, label: 'About' },
  { href: '#', icon: Settings2Icon, label: 'Services' },
  { href: '#', icon: SunIcon, label: 'Contact' },
];

export function Menu() {
  return (
    <div className={styles.menu}>
      {menuItems.map(item => (
        <a key={item.label} className={styles['menu-link']} href={item.href}>
          <item.icon />
        </a>
      ))}
    </div>
  );
}
