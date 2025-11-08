'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/blog', label: 'Yazılar' },
    { href: '/projects', label: 'Projeler' },
    { href: '/glossary', label: 'Sözlük' },
    { href: '/scripts', label: "Script'ler" },
    { href: '/about', label: 'Hakkımda' },
    { href: '/contact', label: 'İletişim' },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-opacity-90 transition-all duration-200 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand/Logo */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group transition-transform hover:scale-[1.02]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-mono font-bold group-hover:bg-primary-600 dark:group-hover:bg-primary-500 transition-colors">
              &gt;_
            </span>
            <span className="hidden sm:block text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
              Sistem Yönetimi & Web Backend
            </span>
            <span className="sm:hidden text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
              SysAdmin Blog
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out rounded-md ${
                      active
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary-500 dark:bg-primary-400" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-3">
          <ul className="flex flex-wrap items-center gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative inline-block px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-in-out rounded-md ${
                      active
                        ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
