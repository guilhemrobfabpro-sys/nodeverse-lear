import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('flowmaster_theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('flowmaster_theme', theme);
  }, [theme]);

  const toggle = () => setTheme(p => (p === 'dark' ? 'light' : 'dark'));

  return { theme, toggle };
}
