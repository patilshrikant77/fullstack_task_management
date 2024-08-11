// Example of a useDarkMode hook
import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [colorTheme, setColorTheme] = useState<string>('light');

  const setTheme = (theme: string) => {
    setColorTheme(theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setColorTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  return [colorTheme, setTheme] as const;
};

export default useDarkMode;
