'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
        disabled
        aria-label="Loading theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      className="p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 ease-in-out hover:-translate-y-0.5 active:translate-y-0 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
      onClick={toggleTheme}
      aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
