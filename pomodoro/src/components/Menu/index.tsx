import {
  HistoryIcon,
  HomeIcon,
  MoonIcon,
  Settings2Icon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

// <a/> depois vai ser link do router

type MenuItem = {
  icon: React.ElementType;
} & React.ComponentProps<'a'>;

export function Menu() {
  const [theme, toggleTheme] = useTheme();

  const nextThemeIcon: React.ElementType =
    theme === 'dark' ? SunIcon : MoonIcon;

  const menuItems: MenuItem[] = [
    {
      href: '#',
      icon: HomeIcon,
      'aria-label': 'Ir para a página inicial',
      title: 'Ir para a página inicial',
    },
    {
      href: '#',
      icon: HistoryIcon,
      'aria-label': 'Ver  histórico',
      title: 'Ver  histórico',
    },
    {
      href: '#',
      icon: Settings2Icon,
      'aria-label': 'Ir para a página de configurações',
      title: 'Ir para a página de configurações',
    },
    {
      href: '#',
      icon: nextThemeIcon,
      'aria-label': 'Ir para a página de contato',
      title: 'Mudar tema',
      onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();

        toggleTheme();
      },
    },
  ];

  return (
    <div className={styles.menu}>
      {menuItems.map(({ icon: Icon, id, ...restProps }) => (
        <a
          key={`menu-item-${id}_${restProps.title}`}
          className={styles['menu-link']}
          {...restProps}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
