// hooks/useTheme.ts
import { useState, useEffect } from 'react';

export type AvailableTheme = 'dark' | 'light';

export function useTheme(): [AvailableTheme, () => void] {
  const [theme, setTheme] = useState<AvailableTheme>(() => {
    const savedTheme = localStorage.getItem('theme') as AvailableTheme | null;
    return savedTheme || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return [theme, toggleTheme];
}
