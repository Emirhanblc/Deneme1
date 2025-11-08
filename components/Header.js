'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projeler' },
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
      className={`sticky top-0 z-50 border-b border-slate-800 bg-slate-950 shadow-[0_1px_0_#1e293b] transition-all duration-200`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand/Logo */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group transition-transform hover:scale-[1.02]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-100 text-sm font-mono font-bold group-hover:bg-sky-500 group-hover:text-white transition-colors">
              &gt;_
            </span>
            <span className="hidden sm:block text-sm font-semibold tracking-tight text-slate-100">
              Sistem Yönetimi & Web Backend
            </span>
            <span className="sm:hidden text-sm font-semibold tracking-tight text-slate-100">
              SysAdmin
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out rounded-md ${
                      active
                        ? 'text-slate-100'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-sky-400" />
                    )}
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
