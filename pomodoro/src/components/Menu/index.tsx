import {
  HistoryIcon,
  HomeIcon,
  MoonIcon,
  Settings2Icon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import React, { useState, useEffect } from 'react';

// <a/> depois vai ser link do router

type availableThemes = 'dark' | 'light';

type MenuItem = {
  icon: React.ElementType;
} & React.ComponentProps<'a'>;

export function Menu() {
  const [theme, setTheme] = useState<availableThemes>(() => {
    const savedTheme = localStorage.getItem('theme') as
      | availableThemes
      | 'dark';
    return savedTheme;
  });

  // useEffect(() => {
  //   console.log('Use effect sem dependencia');
  // });

  // useEffect(() => {
  //   console.log(
  //     'executa apenas quando o react monta o componente pela primeira vez',
  //   );
  // }, []);

  useEffect(() => {
    // console.log('Use effect com dependencia de tema');
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    return () => {
      // console.log('cleanup do tema');
    };
  }, [theme]); // toda vez que o tema mudar, o useEffect é executado

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
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
      },
    },
  ];

  return (
    <div className={styles.menu}>
      {menuItems.map(item => (
        <a
          key={item['aria-label']}
          className={styles['menu-link']}
          href={item.href}
          aria-label={item['aria-label']}
          title={item.title}
          onClick={item.onClick}
        >
          <item.icon />
        </a>
      ))}
    </div>
  );
}
